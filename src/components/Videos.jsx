import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [showContent, setShowContent] = useState(false); // New state to control content visibility
  const VIDEOS_PER_PAGE = 6;
  const [searchParams] = useSearchParams();
  const playlistIdFromURL = searchParams.get("playlistId");
  const navigate = useNavigate();

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

  useEffect(() => {
    if (playlistIdFromURL) {
      const playlistKey = Object.keys(playlists).find(
        (key) => playlists[key].id === playlistIdFromURL
      );
      setSelectedPlaylist(playlistKey || null);
    } else {
      setSelectedPlaylist(null);
    }
  }, [playlistIdFromURL, playlists]);

  useEffect(() => {
    const fetchPlaylistVideos = async () => {
      if (!selectedPlaylist) {
        setLoading(false);
        return;
      }
      try {
        const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
        const playlistId = playlists[selectedPlaylist]?.id;
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}`
        );

        // Handle HTTP errors
        if (!response.ok) {
          if (response.status === 400) {
            throw new Error(
              "Bad Request: Please check your request parameters."
            );
          } else if (response.status === 403) {
            throw new Error(
              "Forbidden: You do not have permission to access this resource."
            );
          } else {
            throw new Error(
              `HTTP Error: ${response.status} - ${response.statusText}`
            );
          }
        }

        const data = await response.json();
        if (data.error) throw new Error(data.error.message);

        setVideos(
          data.items.map((item) => ({
            id: item.snippet.resourceId.videoId,
            title: item.snippet.title,
          }))
        );
      } catch (err) {
        setError(err.message); // Set the error message
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
        setTimeout(() => {
          setShowContent(true); // Show content after 4 seconds
        }, 4000);
      }
    };
    fetchPlaylistVideos();
  }, [playlists, selectedPlaylist]);

  const totalPages = Math.ceil(videos.length / VIDEOS_PER_PAGE);
  const currentVideos = videos.slice(
    (currentPage - 1) * VIDEOS_PER_PAGE,
    currentPage * VIDEOS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleTabClick = (key) => {
    setSelectedPlaylist(key);
    const playlistId = playlists[key]?.id;
    navigate(`/videos?playlistId=${playlistId}`);
  };

  // Function to retry fetching data
  const retryFetch = () => {
    setError(null); // Clear the error
    setLoading(true); // Set loading to true to show the spinner
    setShowContent(false); // Hide content
    setTimeout(() => {
      setShowContent(true); // Show content after 4 seconds
    }, 4000);
  };

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          <p>{error}</p>
          <button onClick={retryFetch}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="wrapper">
        {loading ? (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        ) : showContent ? (
          <>
            <h4>
              {selectedPlaylist
                ? playlists[selectedPlaylist].title
                : "All Projects"}
            </h4>
            <div className="video-container">
              <div className="tabs">
                {Object.keys(playlists)
                  .filter((key) => {
                    if (!selectedPlaylist) return true;
                    const selectedCategory =
                      playlists[selectedPlaylist].title.split(" ")[0];
                    const currentCategory = playlists[key].title.split(" ")[0];
                    return selectedCategory === currentCategory;
                  })
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
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Videos;
