"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, ExternalLink, Radio, Volume2, VolumeX, Image as ImageIcon, RefreshCw } from "lucide-react";
import { Reveal, SectionIntro } from "./MotionBits";
import fallbackPosts from "../data/instagramCache.json";

export default function InstagramFeed() {
  const [items, setItems] = useState(fallbackPosts);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isConfigured, setIsConfigured] = useState(true);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [muted, setMuted] = useState(true);
  const videoRefs = useRef({});

  const loadInstagramPosts = useCallback(async (isManual = false) => {
    try {
      if (isManual) setIsRefreshing(true);
      const res = await fetch(`/api/instagram?t=${Date.now()}`, {
        cache: "no-store",
      });
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 1) {
        setItems(json.data);
        setIsConfigured(Boolean(json.isConfigured));
      }
    } catch (err) {
      console.error("Failed to load Instagram feed:", err);
    } finally {
      setLoading(false);
      if (isManual) {
        setTimeout(() => setIsRefreshing(false), 600);
      }
    }
  }, []);

  useEffect(() => {
    loadInstagramPosts();

    // Fast auto-sync every 8 seconds so uploads & deletes reflect rapidly
    const interval = setInterval(() => {
      loadInstagramPosts();
    }, 8000);

    // Instant sync whenever user returns to the website tab after uploading/deleting on Instagram
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        loadInstagramPosts();
      }
    };

    window.addEventListener("focus", handleVisibility);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", handleVisibility);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [loadInstagramPosts]);

  const togglePlay = (id, isVideo) => {
    if (!isVideo) return;
    const video = videoRefs.current[id];
    if (!video) return;

    if (activeVideoId === id) {
      video.pause();
      setActiveVideoId(null);
    } else {
      if (activeVideoId && videoRefs.current[activeVideoId]) {
        videoRefs.current[activeVideoId].pause();
      }
      video.play().catch(() => {});
      setActiveVideoId(id);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    setMuted(!muted);
    Object.values(videoRefs.current).forEach((v) => {
      if (v) v.muted = !muted;
    });
  };

  const formatDate = (isoStr) => {
    if (!isoStr) return "";
    try {
      const date = new Date(isoStr);
      return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "";
    }
  };

  return (
    <section className="section insta-section" id="stories" aria-labelledby="insta-feed-title">
      <div className="page-wrap">
        <div className="insta-header-row">
          <SectionIntro
            eyebrow="Instagram Live Feed & Updates"
            title="Watch our latest videos & posts."
            description="ధనలక్ష్మి లోన్స్ ఇన్‌స్టాగ్రామ్‌లో మేము షేర్ చేసే సరికొత్త ఫైనాన్షియల్ అప్‌డేట్స్ ఇక్కడ ఆటోమేటిక్‌గా సింక్ అవుతాయి."
            id="insta-feed-title"
          />

          <div className="insta-profile-badge">
            <div className="insta-avatar-ring">
              <div className="insta-avatar-inner">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </div>
            </div>
            <div className="insta-profile-info">
              <div className="insta-handle-wrap">
                <strong>@tirumala.rekha</strong>
                <button
                  type="button"
                  onClick={() => loadInstagramPosts(true)}
                  className="insta-sync-btn"
                  title="Click to sync immediately with Instagram"
                  aria-label="Sync with Instagram"
                >
                  <RefreshCw size={11} className={isRefreshing ? "spin-icon" : ""} />
                  {isRefreshing ? "Syncing..." : "Live Sync"}
                </button>
              </div>
              <small>Dhana Lakshmi Loans Official</small>
            </div>
            <a
              href="https://www.instagram.com/tirumala.rekha"
              target="_blank"
              rel="noopener noreferrer"
              className="button button--insta"
            >
              Follow on Instagram <ExternalLink size={14} />
            </a>
          </div>
        </div>

        <div className="insta-grid">
          {items.map((item, index) => {
            const isVideo = item.media_type === "VIDEO";
            const isPlaying = isVideo && activeVideoId === item.id;

            return (
              <Reveal as="article" className="insta-card" delay={index * 0.08} key={item.id}>
                <div
                  className="insta-card__media-wrap"
                  onClick={() => (isVideo ? togglePlay(item.id, true) : window.open(item.permalink, "_blank"))}
                >
                  {isVideo ? (
                    <video
                      ref={(el) => {
                        if (el) videoRefs.current[item.id] = el;
                      }}
                      src={item.media_url}
                      poster={item.thumbnail_url}
                      loop
                      muted={muted}
                      playsInline
                      className="insta-video"
                    />
                  ) : (
                    <img
                      src={item.media_url || item.thumbnail_url}
                      alt={item.caption || "Instagram Post"}
                      className="insta-img"
                      loading="lazy"
                    />
                  )}

                  {/* Gradient Overlay */}
                  <div className="insta-media-overlay" />

                  {/* Top tags */}
                  <div className="insta-media-top">
                    <span className="insta-reel-tag">
                      {isVideo ? (
                        <>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                          </svg>
                          Reel
                        </>
                      ) : (
                        <>
                          <ImageIcon size={14} /> Post
                        </>
                      )}
                    </span>
                    {isVideo && isPlaying && (
                      <button
                        type="button"
                        className="insta-sound-btn"
                        onClick={toggleMute}
                        aria-label={muted ? "Unmute video" : "Mute video"}
                      >
                        {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                      </button>
                    )}
                  </div>

                  {/* Center Play/Pause button for videos */}
                  {isVideo && (
                    <div className={`insta-play-action ${isPlaying ? "is-playing" : ""}`}>
                      {isPlaying ? <Pause size={28} /> : <Play size={28} fill="currentColor" />}
                    </div>
                  )}

                  {/* Bottom caption overlay */}
                  <div className="insta-media-bottom">
                    <span className="insta-date">{formatDate(item.timestamp)}</span>
                    <p className="insta-caption">{item.caption}</p>
                    <a
                      href={item.permalink || "https://www.instagram.com/tirumala.rekha"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="insta-watch-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Instagram లో చూడండి <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="insta-bottom-cta">
          <p>
            సరికొత్త లోన్ పథకాలు మరియు అప్‌డేట్స్ కోసం మా Instagram పేజీని ఫాలో అవ్వండి.
          </p>
          <a
            href="https://www.instagram.com/tirumala.rekha"
            target="_blank"
            rel="noopener noreferrer"
            className="insta-view-all-btn"
          >
            Visit @tirumala.rekha on Instagram <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
