export default function FollowButton({ isFollowing, follow, unfollow }) {
  return (
    <button
      onClick={isFollowing ? unfollow : follow}
      className={`px-4 py-2 rounded-lg transition-all 
        ${isFollowing ? "bg-[#464646] text-white hover:bg-[#5a5a5a] hover:text-[#2b2b2b]" : "bg-blue-500 text-white"}`}
    >
      {isFollowing ? "Deixar de seguir" : "Seguir"}
    </button>
  );
}
