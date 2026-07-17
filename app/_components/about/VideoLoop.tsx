const VIDEO_SRC =
  "https://video.wixstatic.com/video/e4f166_4c48438d505a466a8d8a7210a879ba76/720p/mp4/file.mp4";
const VIDEO_POSTER =
  "https://static.wixstatic.com/media/dc7de4_eb1b992c05734baa883c67bf5d7d60b5~mv2.png/v1/fill/w_800,h_1200,al_c,q_85,enc_avif,quality_auto/poster.png";

type Props = {
  className?: string;
};

export function VideoLoop({ className = "" }: Props) {
  return (
    <div
      className={`relative aspect-[9/16] w-full overflow-hidden bg-ths-ink ${className}`}
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={VIDEO_SRC}
        poster={VIDEO_POSTER}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden
      />
    </div>
  );
}
