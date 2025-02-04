import { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Read query parameters
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const playlistIdFromUrl = searchParams.get("playlistId");

  // Define playlist IDs for each tab
  const playlists = {
    playlist1: "PLeEExte-NV5k1EGgG-ZF_BwVSaGzammoR", // First playlist
    playlist2: "PLeEExte-NV5l792UiD24XLgan-mra2r3D", // Second playlist
    playlist3: "ANOTHER_PLAYLIST_ID", // Third playlist
    playlist4: "YET_ANOTHER_PLAYLIST_ID", // Fourth playlist
  };

  // Determine the default selected playlist based on the URL or fallback to "playlist1"
  const initialPlaylist =
    Object.keys(playlists).find(
      (key) => playlists[key] === playlistIdFromUrl
    ) || "playlist1";
  const [selectedPlaylist, setSelectedPlaylist] = useState(initialPlaylist);

  useEffect(() => {
    const fetchPlaylistVideos = async () => {
      try {
        const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
        const playlistId = playlists[selectedPlaylist]; // Get playlist ID based on selection
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}`
        );
        if (!response.ok) throw new Error("Network response failed");
        const data = await response.json();
        if (data.error) throw new Error(data.error.message);
        setVideos(
          data.items.map((item) => ({
            id: item.snippet.resourceId.videoId,
            title: item.snippet.title,
          }))
        );
      } catch (err) {
        setError(err.message);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylistVideos();
  }, [selectedPlaylist]); // Refetch when selectedPlaylist changes

  const VIDEOS_PER_PAGE = 6;
  const totalPages = Math.ceil(videos.length / VIDEOS_PER_PAGE);
  const currentVideos = videos.slice(
    (currentPage - 1) * VIDEOS_PER_PAGE,
    currentPage * VIDEOS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  if (error) return <div className="error">Error: {error}</div>;
  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      <div className="wrapper">
        <h4>Architecture Commercial</h4>
        <div className="video-container">
          {/* Tabs for switching playlists */}
          <div className="tabs">
            <button
              onClick={() => setSelectedPlaylist("playlist1")}
              className={selectedPlaylist === "playlist1" ? "active" : ""}
            >
              Architecture Commercial
            </button>
            <button
              onClick={() => setSelectedPlaylist("playlist2")}
              className={selectedPlaylist === "playlist2" ? "active" : ""}
            >
              Architecture Residential
            </button>
            <button
              onClick={() => setSelectedPlaylist("playlist3")}
              className={selectedPlaylist === "playlist3" ? "active" : ""}
            >
              Interior Design
            </button>
            <button
              onClick={() => setSelectedPlaylist("playlist4")}
              className={selectedPlaylist === "playlist4" ? "active" : ""}
            >
              Other Projects
            </button>
          </div>

          {/* Video grid */}
          <div className="video-grid">
            {currentVideos.map((video) => (
              <div key={video.id} className="video-item">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}?modestbranding=0&rel=0&controls=0&showinfo=0&autoplay=1&mute=1&loop=1&playlist=${video.id}`}
                  title={video.title}
                  allowFullScreen
                  style={{ border: "none" }}
                  width={"400px"}
                  height={"200px"}
                />
                <p className="video-title">{video.title}</p>
              </div>
            ))}
          </div>

          {/* Pagination controls */}
          {totalPages > 0 && (
            <div className="pagination-container">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={currentPage === page ? "active" : ""}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Videos;
