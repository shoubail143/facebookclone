"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Globe2, MoreHorizontal, ThumbsUp, MessageCircle, Share2, Video, ImageIcon, Smile, Plus, X, Send, Share, Camera } from "lucide-react";

const stories = [
  { name: "Create story", avatar: "11", photo: null },
  { name: "Ayesha Khan", avatar: "13", photo: "photo-1500530855697-b586d89ba3ee" },
  { name: "Burhan Khan", avatar: "12", photo: "photo-1501785888041-af3ef285b470" },
  { name: "Hamza Ali", avatar: "14", photo: "photo-1500534314209-a25ddb2bd429" },
  { name: "Sara Ahmed", avatar: "15", photo: "photo-1470770841072-f978cf4d019e" },
];

const initialPosts = [
  {
    id: 1,
    author: "Ayesha Khan",
    avatar: "13",
    time: "2h",
    text: "Some peaceful moments from today. Sometimes slowing down is the best plan.",
    photo: "photo-1501785888041-af3ef285b470",
    likes: 248,
    comments: 32,
  },
  {
    id: 2,
    author: "Hamza Ali",
    avatar: "14",
    time: "5h",
    text: "The city looks completely different after sunset 🌆",
    photo: "photo-1519501025264-65ba15a82390",
    likes: 516,
    comments: 74,
  },
  {
    id: 3,
    author: "Sara Ahmed",
    avatar: "15",
    time: "Yesterday",
    text: "A little weekend inspiration. Where should the next trip be?",
    photo: "photo-1500534314209-a25ddb2bd429",
    likes: 184,
    comments: 19,
  },
];

export default function Mainsec() {
  const [liked, setLiked] = useState([]);
  const [activeStory, setActiveStory] = useState(null);
  const [openComments, setOpenComments] = useState([]);
  const [commentDrafts, setCommentDrafts] = useState({});
  const [comments, setComments] = useState({});
  const [sharePost, setSharePost] = useState(null);
  const [createStory, setCreateStory] = useState(false);
  const [composerOpen, setComposerOpen] = useState(false);
  const [posts, setPosts] = useState(initialPosts);
  const [composerText, setComposerText] = useState("");
  const [attachedMedia, setAttachedMedia] = useState(null);
  const [feeling, setFeeling] = useState("");
  const [showFeelings, setShowFeelings] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraMode, setCameraMode] = useState("live");
  const mediaInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  function toggleLike(id) {
    setLiked((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  function toggleComments(id) {
    setOpenComments((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  function addComment(event, postId) {
    event.preventDefault();
    const text = commentDrafts[postId]?.trim();
    if (!text) return;
    setComments((current) => ({ ...current, [postId]: [...(current[postId] || []), text] }));
    setCommentDrafts((current) => ({ ...current, [postId]: "" }));
  }

  async function sharePostNow(post) {
    if (typeof navigator !== "undefined" && navigator.share) {
      await navigator.share({ title: `${post.author} on Facebook`, text: post.text }).catch(() => {});
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(`${post.text} — Facebook`);
      setSharePost(post);
    } else {
      setSharePost(post);
    }
  }

  function stopCamera() {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
  }

  async function openCamera(mode = "live") {
    setCameraMode(mode);
    setCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: mode === "live" });
      streamRef.current = stream;
      window.setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      }, 0);
    } catch {
      // The camera may be unavailable or denied; the fallback lets users choose a file.
      closeCamera();
      cameraInputRef.current?.click();
    }
  }

  function closeCamera() {
    stopCamera();
    setCameraOpen(false);
  }

  function capturePhoto() {
    const video = videoRef.current;
    if (!video || !video.videoWidth) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    canvas.toBlob((blob) => {
      if (!blob) return;
      setAttachedMedia({ url: URL.createObjectURL(blob), type: "image" });
      closeCamera();
      setCreateStory(false);
      setComposerOpen(true);
    }, "image/jpeg", 0.9);
  }

  function handleMedia(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    setAttachedMedia({ url: URL.createObjectURL(file), type: file.type.startsWith("video/") ? "video" : "image", name: file.name });
    setComposerOpen(true);
    event.target.value = "";
  }

  function publishPost() {
    if (!composerText.trim() && !attachedMedia && !feeling) return;
    setPosts((current) => [{
      id: Date.now(), author: "Shoubail Akhtar", avatar: "11", time: "Just now",
      text: `${composerText.trim()}${feeling ? ` — feeling ${feeling}` : ""}`,
      photo: null, customPhoto: attachedMedia?.type === "image" ? attachedMedia.url : null,
      customVideo: attachedMedia?.type === "video" ? attachedMedia.url : null,
      likes: 0, comments: 0,
    }, ...current]);
    setComposerText("");
    setAttachedMedia(null);
    setFeeling("");
    setComposerOpen(false);
  }

  return (
    <main className="min-h-[calc(100vh-56px)] bg-[#18191a] px-2 py-5 sm:px-4 lg:ml-[360px] xl:mr-[360px]">
      <div className="mx-auto flex w-full max-w-[680px] flex-col gap-4">
        <section className="rounded-lg bg-[#242526] p-2 shadow-sm sm:p-4" aria-label="Stories">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {stories.map((story) => (
              <button key={story.name} onClick={() => story.photo ? setActiveStory(story) : setCreateStory(true)} className="relative h-[198px] w-[112px] shrink-0 overflow-hidden rounded-lg bg-[#3a3b3c] text-left shadow-sm transition-transform hover:-translate-y-0.5">
                {story.photo ? (
                  <Image
                    src={`https://images.unsplash.com/${story.photo}?auto=format&fit=crop&w=300&q=80`}
                    alt=""
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                ) : (
                  <div className="relative h-[150px] overflow-hidden">
                    <Image src="https://i.pravatar.cc/150?img=11" alt="Your profile" fill sizes="112px" unoptimized className="object-cover" />
                  </div>
                )}
                {story.photo ? <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" /> : null}
                {story.photo ? (
                  <div className="absolute left-2 top-2 h-10 w-10 rounded-full border-4 border-blue-500 bg-[#242526] p-0.5">
                    <Image src={`https://i.pravatar.cc/150?img=${story.avatar}`} alt="" fill sizes="32px" unoptimized className="rounded-full object-cover" />
                  </div>
                ) : (
                  <div className="absolute bottom-[42px] left-1/2 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border-4 border-[#242526] bg-blue-500 text-white">
                    <Plus size={20} strokeWidth={3} />
                  </div>
                )}
                <span className={`absolute bottom-0 left-0 right-0 px-2 text-center text-[13px] font-semibold text-white ${story.photo ? "pb-2" : "h-[48px] pt-1 leading-4"}`}>
                  {story.name}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-lg bg-[#242526] px-4 py-3 shadow-sm">
          <div className="flex items-center gap-2 border-b border-[#3e4042] pb-3">
            <Image src="https://i.pravatar.cc/150?img=11" alt="Your profile" width={40} height={40} unoptimized className="rounded-full" />
            <button onClick={() => setComposerOpen(true)} className="h-10 flex-1 rounded-full bg-[#3a3b3c] px-4 text-left text-[15px] text-[#b0b3b8] hover:bg-[#4e4f50]">
              What&apos;s on your mind, Shoubail?
            </button>
          </div>
          <div className="grid grid-cols-3 pt-2 text-sm font-semibold text-[#b0b3b8]">
            <button onClick={() => openCamera("live")} className="flex h-9 items-center justify-center gap-2 rounded-md hover:bg-[#3a3b3c] text-red-400"><Video size={20} fill="currentColor" /><span className="hidden sm:inline">Live video</span></button>
            <button onClick={() => mediaInputRef.current?.click()} className="flex h-9 items-center justify-center gap-2 rounded-md hover:bg-[#3a3b3c] text-green-400"><ImageIcon size={20} /><span className="hidden sm:inline">Photo/video</span></button>
            <button onClick={() => { setComposerOpen(true); setShowFeelings(true); }} className="flex h-9 items-center justify-center gap-2 rounded-md hover:bg-[#3a3b3c] text-yellow-400"><Smile size={20} /><span className="hidden sm:inline">Feeling/activity</span></button>
          </div>
          <input ref={mediaInputRef} type="file" accept="image/*,video/*" onChange={handleMedia} className="hidden" />
          <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" onChange={handleMedia} className="hidden" />
        </section>

        {posts.map((post) => {
          const isLiked = liked.includes(post.id);
          return (
            <article key={post.id} className="rounded-lg bg-[#242526] shadow-sm">
              <header className="flex items-center gap-3 px-4 py-3">
                <Image src={`https://i.pravatar.cc/150?img=${post.avatar}`} alt={post.author} width={40} height={40} unoptimized className="rounded-full" />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-[#e4e6eb]">{post.author}</p>
                  <p className="flex items-center gap-1 text-xs text-[#b0b3b8]">{post.time} · <Globe2 size={12} /></p>
                </div>
                <button aria-label="Post options" className="rounded-full p-2 text-[#b0b3b8] hover:bg-[#3a3b3c]"><MoreHorizontal /></button>
              </header>
              <p className="px-4 pb-3 text-[15px] text-[#e4e6eb]">{post.text}</p>
              {(post.photo || post.customPhoto || post.customVideo) && (
                <div className="relative aspect-[4/3] overflow-hidden bg-[#18191a]">
                  {post.customVideo ? <video src={post.customVideo} controls className="h-full w-full object-cover" /> : post.customPhoto ? <Image src={post.customPhoto} alt="Post attachment" fill unoptimized sizes="680px" className="object-cover" /> : <Image src={`https://images.unsplash.com/${post.photo}?auto=format&fit=crop&w=1000&q=85`} alt="" fill sizes="680px" className="object-cover" />}
                </div>
              )}
              <div className="mx-4 flex h-10 items-center justify-between border-b border-[#3e4042] text-sm text-[#b0b3b8]">
                <span>👍 {post.likes + (isLiked ? 1 : 0)}</span>
                <span>{post.comments + (comments[post.id]?.length || 0)} comments · Share</span>
              </div>
              <div className="grid h-12 grid-cols-3 px-2 text-sm font-semibold text-[#b0b3b8]">
                <button onClick={() => toggleLike(post.id)} className={`flex items-center justify-center gap-2 rounded-md hover:bg-[#3a3b3c] ${isLiked ? "text-blue-500" : ""}`}><ThumbsUp size={20} fill={isLiked ? "currentColor" : "none"} />Like</button>
                <button onClick={() => toggleComments(post.id)} className={`flex items-center justify-center gap-2 rounded-md hover:bg-[#3a3b3c] ${openComments.includes(post.id) ? "text-blue-500" : ""}`}><MessageCircle size={20} />Comment</button>
                <button onClick={() => sharePostNow(post)} className="flex items-center justify-center gap-2 rounded-md hover:bg-[#3a3b3c]"><Share2 size={20} />Share</button>
              </div>

              {openComments.includes(post.id) && (
                <div className="border-t border-[#3e4042] px-4 pb-4 pt-3">
                  {(comments[post.id] || []).map((comment, index) => (
                    <div key={`${comment}-${index}`} className="mb-2 flex gap-2">
                      <Image src="https://i.pravatar.cc/150?img=11" alt="You" width={32} height={32} unoptimized className="h-8 w-8 rounded-full" />
                      <div className="rounded-2xl bg-[#3a3b3c] px-3 py-2 text-sm text-[#e4e6eb]">
                        <span className="font-semibold">Shoubail Akhtar</span>
                        <p>{comment}</p>
                      </div>
                    </div>
                  ))}
                  <form onSubmit={(event) => addComment(event, post.id)} className="flex items-center gap-2">
                    <Image src="https://i.pravatar.cc/150?img=11" alt="You" width={32} height={32} unoptimized className="h-8 w-8 rounded-full" />
                    <input
                      value={commentDrafts[post.id] || ""}
                      onChange={(event) => setCommentDrafts((current) => ({ ...current, [post.id]: event.target.value }))}
                      placeholder="Write a comment..."
                      className="h-9 min-w-0 flex-1 rounded-full bg-[#3a3b3c] px-4 text-sm text-white outline-none placeholder:text-[#b0b3b8]"
                    />
                    <button aria-label="Post comment" className="rounded-full p-2 text-blue-500"><Send size={18} /></button>
                  </form>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {activeStory && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-3" role="dialog" aria-modal="true">
          <button onClick={() => setActiveStory(null)} aria-label="Close story" className="absolute right-5 top-5 rounded-full bg-black/40 p-2 text-white"><X /></button>
          <div className="relative h-[min(720px,88vh)] w-full max-w-[430px] overflow-hidden rounded-xl bg-[#242526]">
            <Image src={`https://images.unsplash.com/${activeStory.photo}?auto=format&fit=crop&w=900&q=90`} alt={`${activeStory.name}'s story`} fill priority sizes="430px" className="object-cover" />
            <div className="absolute left-3 right-3 top-3 h-1 rounded bg-white/40"><div className="h-full w-2/3 rounded bg-white" /></div>
            <div className="absolute left-4 right-4 top-6 flex items-center gap-2 text-white">
              <Image src={`https://i.pravatar.cc/150?img=${activeStory.avatar}`} alt="" width={40} height={40} unoptimized className="rounded-full ring-2 ring-blue-500" />
              <strong>{activeStory.name}</strong>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex gap-2">
              <input placeholder="Reply..." className="h-10 min-w-0 flex-1 rounded-full border border-white/60 bg-black/20 px-4 text-white outline-none placeholder:text-white/80" />
              <button aria-label="Send reply" className="rounded-full bg-blue-500 p-2.5 text-white"><Send size={20} /></button>
            </div>
          </div>
        </div>
      )}

      {createStory && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-md rounded-xl bg-[#242526] p-5 text-white shadow-xl">
            <div className="flex items-center justify-between"><h2 className="text-xl font-bold">Create story</h2><button onClick={() => setCreateStory(false)} aria-label="Close"><X /></button></div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <button onClick={() => openCamera("story")} className="flex h-44 flex-col items-center justify-center gap-3 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 text-lg font-bold"><Camera size={36} />Use camera</button>
              <button onClick={() => mediaInputRef.current?.click()} className="flex h-44 flex-col items-center justify-center gap-3 rounded-lg bg-[#3a3b3c] text-lg font-bold hover:bg-[#4e4f50]"><ImageIcon size={36} />Photo library</button>
            </div>
          </div>
        </div>
      )}

      {composerOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-lg rounded-xl bg-[#242526] p-4 text-white shadow-xl">
            <div className="flex items-center justify-between border-b border-[#3e4042] pb-3"><h2 className="mx-auto text-xl font-bold">Create post</h2><button onClick={() => setComposerOpen(false)} aria-label="Close"><X /></button></div>
            <div className="flex items-center gap-3 py-3"><Image src="https://i.pravatar.cc/150?img=11" alt="You" width={40} height={40} unoptimized className="rounded-full" /><div><strong>Shoubail Akhtar</strong>{feeling && <p className="text-sm text-[#b0b3b8]">— feeling {feeling}</p>}</div></div>
            <textarea value={composerText} onChange={(event) => setComposerText(event.target.value)} autoFocus={!showFeelings} placeholder="What's on your mind, Shoubail?" className="h-28 w-full resize-none bg-transparent text-xl outline-none" />
            {attachedMedia && <div className="relative mb-3 max-h-72 overflow-hidden rounded-lg bg-[#18191a]">{attachedMedia.type === "video" ? <video src={attachedMedia.url} controls className="max-h-72 w-full" /> : <Image src={attachedMedia.url} alt="Selected media" width={600} height={400} unoptimized className="max-h-72 w-full object-contain" />}<button onClick={() => setAttachedMedia(null)} className="absolute right-2 top-2 rounded-full bg-[#242526] p-1"><X size={18} /></button></div>}
            {showFeelings && <div className="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-3">{["happy 😊", "blessed 🙏", "excited 🎉", "loved ❤️", "grateful 🌟", "amazing 😎"].map((item) => <button key={item} onClick={() => { setFeeling(item); setShowFeelings(false); }} className="rounded-lg bg-[#3a3b3c] px-3 py-2 text-sm hover:bg-[#4e4f50]">{item}</button>)}</div>}
            {!showFeelings && <div className="flex items-center justify-between rounded-lg border border-[#3e4042] p-2"><span className="text-sm font-semibold">Add to your post</span><div className="flex gap-1"><button onClick={() => mediaInputRef.current?.click()} aria-label="Add photo or video" className="rounded-full p-2 text-green-400 hover:bg-[#3a3b3c]"><ImageIcon /></button><button onClick={() => openCamera("photo")} aria-label="Take photo" className="rounded-full p-2 text-blue-400 hover:bg-[#3a3b3c]"><Camera /></button><button onClick={() => setShowFeelings(true)} aria-label="Add feeling" className="rounded-full p-2 text-yellow-400 hover:bg-[#3a3b3c]"><Smile /></button></div></div>}
            <button onClick={publishPost} disabled={!composerText.trim() && !attachedMedia && !feeling} className="mt-4 h-10 w-full rounded-md bg-blue-600 font-semibold hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-[#3a3b3c] disabled:text-[#b0b3b8]">Post</button>
          </div>
        </div>
      )}

      {cameraOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 p-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-lg overflow-hidden rounded-xl bg-[#242526] text-white">
            <div className="flex items-center justify-between p-4"><h2 className="text-lg font-bold">{cameraMode === "live" ? "Live video" : "Take a photo"}</h2><button onClick={closeCamera} aria-label="Close camera"><X /></button></div>
            <video ref={videoRef} autoPlay muted playsInline className="aspect-[4/3] w-full bg-black object-cover" />
            <div className="flex gap-3 p-4">
              <button onClick={closeCamera} className="h-11 flex-1 rounded-md bg-[#3a3b3c] font-semibold">Cancel</button>
              {cameraMode === "live" ? <button onClick={() => { closeCamera(); setCreateStory(false); setComposerOpen(true); }} className="h-11 flex-1 rounded-md bg-red-600 font-semibold">Start live video</button> : <button onClick={capturePhoto} className="h-11 flex-1 rounded-md bg-blue-600 font-semibold">Capture photo</button>}
            </div>
          </div>
        </div>
      )}

      {sharePost && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-sm rounded-xl bg-[#242526] p-5 text-white shadow-xl">
            <div className="flex items-center justify-between"><h2 className="text-lg font-bold">Share post</h2><button onClick={() => setSharePost(null)} aria-label="Close"><X /></button></div>
            <p className="mt-3 text-sm text-[#b0b3b8]">Post link copied to your clipboard.</p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <button className="rounded-lg bg-[#3a3b3c] py-3"><Share className="mx-auto" size={20} /><span className="text-xs">Share</span></button>
              <button className="rounded-lg bg-[#3a3b3c] py-3 text-xs">Send</button>
              <button onClick={() => setSharePost(null)} className="rounded-lg bg-[#3a3b3c] py-3 text-xs">Done</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
