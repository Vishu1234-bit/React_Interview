import { HeartIcon, SpinnerIcon } from "./icons";
import { useState } from "react";
export default function App() {
  const [liked, setliked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function handleLike() {
    if (loading) {
      return;
    }
    setLoading(true);
    setError("");
    const action = liked ? "unlike" : "like";
    try {
      const data = await fetch(
        "https://www.greatfrontend.com/api/questions/like-button",
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ action }),
        },
      );
      const response = await data.json();
      console.log(data);
      if (!data.ok) {
        throw new Error(response.message || "Failed to ${action}");
      }
      setliked(!liked);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={handleLike}
        className={`button ${liked?"liked":""}`}
      >
        {loading ? <SpinnerIcon /> : <HeartIcon />}Like
      </button>
    </div>
  );
}
