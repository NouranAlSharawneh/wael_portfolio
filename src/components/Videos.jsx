import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState("playlist1"); // Track selected playlist
  const VIDEOS_PER_PAGE = 6;
  const [searchParams] = useSearchParams();
  const playlistIdFromURL = searchParams.get("playlistId");
  const navigate = useNavigate();

  // Define playlist IDs and titles for each tab
  const playlists = {
    playlist1: {
      id: "PLeEExte-NV5k1EGgG-ZF_BwVSaGzammoR",
      title: "Architecture Commercial",
    },
    playlist2: {
      id: "PLeEExte-NV5l792UiD24XLgan-mra2r3D",
      title: "Architecture Residential",
    },
    playlist3: {
      id: "PLeEExte-NV5kxOK2YHMrgkIJ6_L2Zw5Mc",
      title: "Interior Design Residential",
    },
    playlist4: {
      id: "PLeEExte-NV5l8Eunk7QNlZtP3GTnqNuE7",
      title: "Interior Design Commercial",
    },
  };

  // Set the default selected playlist based on the URL
  useEffect(() => {
    if (playlistIdFromURL) {
      // Find the playlist key that matches the `playlistId` from the URL
      const playlistKey = Object.keys(playlists).find(
        (key) => playlists[key].id === playlistIdFromURL
      );
      if (playlistKey) {
        setSelectedPlaylist(playlistKey);
      }
    }
  }, [playlistIdFromURL, playlists]);

  useEffect(() => {
    const fetchPlaylistVideos = async () => {
      try {
        const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
        const playlistId = playlists[selectedPlaylist]?.id; // Get playlist ID based on selection
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
  }, [playlists, selectedPlaylist]); // Refetch when selectedPlaylist changes

  // Pagination variables
  const totalPages = Math.ceil(videos.length / VIDEOS_PER_PAGE);
  const currentVideos = videos.slice(
    (currentPage - 1) * VIDEOS_PER_PAGE,
    currentPage * VIDEOS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Function to handle tab clicks
  const handleTabClick = (key) => {
    setSelectedPlaylist(key);
    const playlistId = playlists[key]?.id;
    navigate(`/videos?playlistId=${playlistId}`); // Update the URL with the new playlistId
  };

  if (error) return <div className="error">Error: {error}</div>;
  if (loading) return <div className="loading">Loading...</div>;

  // Get the title of the currently selected playlist
  const selectedPlaylistTitle = playlists[selectedPlaylist]?.title;

  return (
    <div className="container">
      <div className="wrapper">
        {/* Dynamically display the selected playlist title */}
        <h4>{selectedPlaylistTitle}</h4>
        <div className="video-container">
          {/* Tabs for switching playlists */}
          <div className="tabs">
            {Object.keys(playlists)
              .filter(
                (key) =>
                  playlists[key].title.split(" ")[0] ===
                  playlists[selectedPlaylist].title.split(" ")[0]
              )
              .map((key) => (
                <button
                  key={key}
                  onClick={() => handleTabClick(key)}
                  className={selectedPlaylist === key ? "active" : ""}
                >
                  {playlists[key].title}
                </button>
              ))}
          </div>

          {/* Video grid */}
          <div className="video-grid">
            {currentVideos.map((video) => (
              <div key={video.id} className="video-item">
                <iframe
                  className="movie-player"
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
