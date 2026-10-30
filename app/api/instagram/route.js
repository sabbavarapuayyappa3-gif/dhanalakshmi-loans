import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Disable Next.js caching completely so uploads and deletes sync instantly
export const dynamic = "force-dynamic";
export const revalidate = 0;

function getFallbackPosts() {
  try {
    const cachePath = path.join(process.cwd(), "data", "instagramCache.json");
    if (fs.existsSync(cachePath)) {
      const data = JSON.parse(fs.readFileSync(cachePath, "utf-8"));
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    }
  } catch (err) {
    console.warn("Failed reading instagramCache.json:", err);
  }
  return [];
}

function saveFallbackPosts(items) {
  try {
    const cachePath = path.join(process.cwd(), "data", "instagramCache.json");
    fs.writeFileSync(cachePath, JSON.stringify(items, null, 2), "utf-8");
  } catch (err) {
    console.warn("Failed writing instagramCache.json:", err);
  }
}

function getEnvCredentials() {
  let token = process.env.INSTAGRAM_ACCESS_TOKEN || "";
  let igAccountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID || "17841438971111832";
  let appId = process.env.META_APP_ID || "1642106017554115";
  let appSecret = process.env.META_APP_SECRET || "";

  try {
    const envPath = path.join(process.cwd(), ".env.local");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8");
      const lines = content.split("\n");
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith("INSTAGRAM_ACCESS_TOKEN=")) {
          token = trimmed.replace("INSTAGRAM_ACCESS_TOKEN=", "").trim();
        }
        if (trimmed.startsWith("INSTAGRAM_BUSINESS_ACCOUNT_ID=")) {
          igAccountId = trimmed.replace("INSTAGRAM_BUSINESS_ACCOUNT_ID=", "").trim();
        }
        if (trimmed.startsWith("META_APP_ID=")) {
          appId = trimmed.replace("META_APP_ID=", "").trim();
        }
        if (trimmed.startsWith("META_APP_SECRET=")) {
          appSecret = trimmed.replace("META_APP_SECRET=", "").trim();
        }
      }
    }
  } catch (e) {
    console.warn("Failed reading .env.local directly:", e);
  }

  return { token, igAccountId, appId, appSecret };
}

async function autoRefreshLongLivedToken(token, appId, appSecret) {
  if (!token || !appId || !appSecret) return token;
  try {
    const exchangeUrl = `https://graph.facebook.com/v20.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${token}`;
    const res = await fetch(exchangeUrl, { cache: "no-store" });
    const data = await res.json();
    if (data.access_token && data.access_token !== token) {
      const envPath = path.join(process.cwd(), ".env.local");
      if (fs.existsSync(envPath)) {
        let content = fs.readFileSync(envPath, "utf-8");
        content = content.replace(/INSTAGRAM_ACCESS_TOKEN=.*/, `INSTAGRAM_ACCESS_TOKEN=${data.access_token}`);
        fs.writeFileSync(envPath, content, "utf-8");
      }
      return data.access_token;
    }
  } catch (err) {
    console.warn("Auto-refresh token error:", err);
  }
  return token;
}

export async function GET() {
  const fallbackPosts = getFallbackPosts();
  const { token, igAccountId } = getEnvCredentials();

  if (!token) {
    return NextResponse.json(
      {
        success: true,
        isConfigured: true,
        message: "Showing saved Instagram posts.",
        data: fallbackPosts,
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  }

  try {
    const fields = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";
    const endpoint = `https://graph.facebook.com/v20.0/${igAccountId}/media?fields=${fields}&access_token=${token}&limit=12`;

    const res = await fetch(endpoint, {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache",
      },
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      console.warn("Instagram API live fetch warning (serving fallback posts):", errData?.error?.message);
      return NextResponse.json(
        {
          success: true,
          isConfigured: true,
          apiError: errData?.error?.message || "Using persistent cache",
          data: fallbackPosts,
        },
        {
          headers: {
            "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
        }
      );
    }

    const json = await res.json();
    const rawItems = json.data || [];

    if (rawItems.length > 0) {
      const items = rawItems.map((item) => ({
        id: item.id,
        media_type: item.media_type || "IMAGE",
        media_url: item.media_url,
        thumbnail_url: item.thumbnail_url || item.media_url,
        caption: item.caption || "Dhana Lakshmi Loans",
        permalink: item.permalink || "https://www.instagram.com/tirumala.rekha",
        timestamp: item.timestamp,
      }));

      // Cache fresh items for seamless future loads
      saveFallbackPosts(items);

      return NextResponse.json(
        {
          success: true,
          isConfigured: true,
          data: items,
        },
        {
          headers: {
            "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        isConfigured: true,
        data: fallbackPosts,
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("Instagram route error:", error);
    return NextResponse.json(
      {
        success: true,
        isConfigured: true,
        apiError: error.message,
        data: fallbackPosts,
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  }
}
