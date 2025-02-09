import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // Controls the spinner
  const [error, setError] = useState(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null); // Track selected playlist
  const [isAllProjects, setIsAllProjects] = useState(false); // Track if "All Projects" is selected
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
      const playlistKey = Object.keys(playlists).find(
        (key) => playlists[key].id === playlistIdFromURL
      );
      if (playlistKey) {
        setSelectedPlaylist(playlistKey);
        setIsAllProjects(false); // Ensure "All Projects" is not active
      }
    } else {
      setIsAllProjects(true); // If no playlistId in URL, assume "All Projects"
      setSelectedPlaylist(null);
    }
  }, [playlistIdFromURL, playlists]);

  // Fetch videos from YouTube API
  useEffect(() => {
    const fetchPlaylistVideos = async () => {
      try {
        setLoading(true); // Show spinner
        const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

        if (!apiKey) {
          throw new Error(
            "YouTube API key is missing. Please check your .env file."
          );
        }

        // Fetch videos for all playlists if "All Projects" is selected
        let allVideos = [];
        if (isAllProjects) {
          for (const key in playlists) {
            const playlistId = playlists[key].id;
            const response = await fetch(
              `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}`
            );

            if (!response.ok) {
              throw new Error(
                `Failed to fetch playlist ${playlists[key].title}: ${response.statusText}`
              );
            }

            const data = await response.json();
            if (data.error) {
              throw new Error(
                data.error.message || "Unknown YouTube API error."
              );
            }

            // Append videos with their playlist title
            allVideos = [
              ...allVideos,
              ...data.items.map((item) => ({
                id: item.snippet.resourceId.videoId,
                title: item.snippet.title,
                playlistTitle: playlists[key].title,
              })),
            ];
          }
          setVideos(allVideos);
        } else {
          // Fetch videos for a single playlist
          const playlistId = playlists[selectedPlaylist]?.id;
          const response = await fetch(
            `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}`
          );

          if (!response.ok) {
            throw new Error(
              `Failed to fetch playlist ${playlists[selectedPlaylist]?.title}: ${response.statusText}`
            );
          }

          const data = await response.json();
          if (data.error) {
            throw new Error(data.error.message || "Unknown YouTube API error.");
          }

          setVideos(
            data.items.map((item) => ({
              id: item.snippet.resourceId.videoId,
              title: item.snippet.title,
            }))
          );
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false); // Hide spinner
      }
    };

    fetchPlaylistVideos();
  }, [playlists, selectedPlaylist, isAllProjects]);

  // Pagination variables
  const totalPages = Math.ceil(videos.length / VIDEOS_PER_PAGE);
  const currentVideos = videos.slice(
    (currentPage - 1) * VIDEOS_PER_PAGE,
    currentPage * VIDEOS_PER_PAGE
  );

  // Handle page change
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Handle tab clicks
  const handleTabClick = (key) => {
    if (key === "all") {
      setIsAllProjects(true);
      setSelectedPlaylist(null); // Reset selected playlist
      navigate("/videos"); // Navigate to "All Projects"
    } else {
      setIsAllProjects(false);
      setSelectedPlaylist(key);
      const playlistId = playlists[key]?.id;
      navigate(`/videos?playlistId=${playlistId}`);
    }
  };

  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="container">
      <div className="wrapper">
        {/* Dynamically display the selected playlist title */}
        <h4>
          {isAllProjects ? "All Projects" : playlists[selectedPlaylist]?.title}
        </h4>
        <div className="video-container">
          {/* Tabs for switching playlists */}
          <div className="tabs">
            <button
              onClick={() => handleTabClick("all")}
              className={isAllProjects ? "active" : ""}
            >
              All Projects
            </button>
            {Object.keys(playlists).map((key) => (
              <button
                key={key}
                onClick={() => handleTabClick(key)}
                className={selectedPlaylist === key ? "active" : ""}
              >
                {playlists[key].title}
              </button>
            ))}
          </div>

          {/* Spinner or Video Grid */}
          {loading ? (
            <div className="spinner-container">
              <div className="spinner"></div>
            </div>
          ) : (
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
                  {isAllProjects && (
                    <p className="playlist-title">{video.playlistTitle}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Pagination controls */}
          {!loading && totalPages > 0 && (
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
