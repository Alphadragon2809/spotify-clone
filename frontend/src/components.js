import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

// Mock data for the Spotify clone
const mockData = {
  recentlyPlayed: [
    {
      id: 1,
      name: "Liked Songs",
      type: "playlist",
      cover: "https://images.unsplash.com/photo-1587731556938-38755b4803a6",
      tracks: [
        {
          id: 105,
          name: "Blinding Lights",
          artist: "The Weeknd",
          album: "After Hours",
          duration: "3:20",
          cover: "https://images.unsplash.com/photo-1587731556938-38755b4803a6"
        },
        {
          id: 106,
          name: "Watermelon Sugar",
          artist: "Harry Styles",
          album: "Fine Line",
          duration: "2:54",
          cover: "https://images.unsplash.com/photo-1587731556938-38755b4803a6"
        }
      ]
    },
    {
      id: 2,
      name: "Daily Mix 1",
      type: "playlist",
      cover: "https://images.unsplash.com/photo-1629923759854-156b88c433aa",
      tracks: [
        {
          id: 107,
          name: "Shape of You",
          artist: "Ed Sheeran",
          album: "÷ (Divide)",
          duration: "3:53",
          cover: "https://images.unsplash.com/photo-1629923759854-156b88c433aa"
        }
      ]
    },
    {
      id: 3,
      name: "Discover Weekly",
      type: "playlist",
      cover: "https://images.pexels.com/photos/6827290/pexels-photo-6827290.jpeg",
      tracks: [
        {
          id: 108,
          name: "Levitating",
          artist: "Dua Lipa",
          album: "Future Nostalgia",
          duration: "3:23",
          cover: "https://images.pexels.com/photos/6827290/pexels-photo-6827290.jpeg"
        }
      ]
    },
    {
      id: 4,
      name: "Hip Hop Central",
      type: "playlist",
      cover: "https://images.unsplash.com/photo-1415886541506-6efc5e4b1786",
      tracks: [
        {
          id: 109,
          name: "HUMBLE.",
          artist: "Kendrick Lamar",
          album: "DAMN.",
          duration: "2:57",
          cover: "https://images.unsplash.com/photo-1415886541506-6efc5e4b1786"
        }
      ]
    },
    {
      id: 5,
      name: "Rock Classics",
      type: "playlist",
      cover: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee",
      tracks: [
        {
          id: 110,
          name: "Bohemian Rhapsody",
          artist: "Queen",
          album: "A Night at the Opera",
          duration: "5:55",
          cover: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee"
        }
      ]
    },
    {
      id: 6,
      name: "Jazz Essentials",
      type: "playlist",
      cover: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f",
      tracks: [
        {
          id: 111,
          name: "Take Five",
          artist: "Dave Brubeck",
          album: "Time Out",
          duration: "5:24",
          cover: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f"
        }
      ]
    }
  ],
  featuredPlaylists: [
    {
      id: 7,
      name: "Today's Top Hits",
      description: "The most played songs right now",
      cover: "https://images.unsplash.com/photo-1728140161994-975b3f4fd93c",
      tracks: [
        {
          id: 101,
          name: "Flowers",
          artist: "Miley Cyrus",
          album: "Endless Summer Vacation",
          duration: "3:20",
          cover: "https://images.unsplash.com/photo-1516981442399-a91139e20ff8"
        },
        {
          id: 102,
          name: "Anti-Hero",
          artist: "Taylor Swift",
          album: "Midnights",
          duration: "3:20",
          cover: "https://images.pexels.com/photos/9001962/pexels-photo-9001962.jpeg"
        },
        {
          id: 112,
          name: "As It Was",
          artist: "Harry Styles",
          album: "Harry's House",
          duration: "2:47",
          cover: "https://images.unsplash.com/photo-1516981442399-a91139e20ff8"
        },
        {
          id: 113,
          name: "Heat Waves",
          artist: "Glass Animals",
          album: "Dreamland",
          duration: "3:58",
          cover: "https://images.unsplash.com/photo-1728140161994-975b3f4fd93c"
        },
        {
          id: 114,
          name: "Good 4 U",
          artist: "Olivia Rodrigo",
          album: "SOUR",
          duration: "2:58",
          cover: "https://images.pexels.com/photos/9001962/pexels-photo-9001962.jpeg"
        }
      ]
    },
    {
      id: 8,
      name: "RapCaviar",
      description: "New music and rap favorites",
      cover: "https://images.unsplash.com/photo-1415886541506-6efc5e4b1786",
      tracks: [
        {
          id: 103,
          name: "God's Plan",
          artist: "Drake",
          album: "Scorpion",
          duration: "3:18",
          cover: "https://images.unsplash.com/photo-1415886541506-6efc5e4b1786"
        },
        {
          id: 115,
          name: "SICKO MODE",
          artist: "Travis Scott",
          album: "ASTROWORLD",
          duration: "5:12",
          cover: "https://images.unsplash.com/photo-1415886541506-6efc5e4b1786"
        },
        {
          id: 116,
          name: "Old Town Road",
          artist: "Lil Nas X",
          album: "7",
          duration: "2:37",
          cover: "https://images.unsplash.com/photo-1415886541506-6efc5e4b1786"
        }
      ]
    },
    {
      id: 9,
      name: "Chill Hits",
      description: "Kick back to the best new and recent chill hits",
      cover: "https://images.unsplash.com/photo-1652626627248-2f659cdbd6cc",
      tracks: [
        {
          id: 117,
          name: "Peaches",
          artist: "Justin Bieber",
          album: "Justice",
          duration: "3:18",
          cover: "https://images.unsplash.com/photo-1652626627248-2f659cdbd6cc"
        },
        {
          id: 118,
          name: "Deja Vu",
          artist: "Olivia Rodrigo",
          album: "SOUR",
          duration: "3:35",
          cover: "https://images.unsplash.com/photo-1652626627248-2f659cdbd6cc"
        }
      ]
    },
    {
      id: 10,
      name: "Electronic Focus",
      description: "Electronic beats to help you focus",
      cover: "https://images.unsplash.com/photo-1599423424751-54e0c1187a02",
      tracks: [
        {
          id: 119,
          name: "Strobe",
          artist: "Deadmau5",
          album: "For Lack of a Better Name",
          duration: "10:36",
          cover: "https://images.unsplash.com/photo-1599423424751-54e0c1187a02"
        },
        {
          id: 120,
          name: "Midnight City",
          artist: "M83",
          album: "Hurry Up, We're Dreaming",
          duration: "4:03",
          cover: "https://images.unsplash.com/photo-1599423424751-54e0c1187a02"
        }
      ]
    },
    {
      id: 11,
      name: "Country Hits",
      description: "The biggest country songs",
      cover: "https://images.unsplash.com/photo-1598901704027-18db7e0e8c60",
      tracks: [
        {
          id: 121,
          name: "The Good Ones",
          artist: "Gabby Barrett",
          album: "Goldmine",
          duration: "2:45",
          cover: "https://images.unsplash.com/photo-1598901704027-18db7e0e8c60"
        },
        {
          id: 122,
          name: "Heartbreak Hill",
          artist: "Ryan Hurd",
          album: "Pelago",
          duration: "3:22",
          cover: "https://images.unsplash.com/photo-1598901704027-18db7e0e8c60"
        }
      ]
    },
    {
      id: 12,
      name: "Reggae Gold",
      description: "Classic and modern reggae vibes",
      cover: "https://images.unsplash.com/photo-1612265314771-2f0a4348a3ab",
      tracks: [
        {
          id: 123,
          name: "No Woman No Cry",
          artist: "Bob Marley",
          album: "Natty Dread",
          duration: "7:08",
          cover: "https://images.unsplash.com/photo-1612265314771-2f0a4348a3ab"
        },
        {
          id: 124,
          name: "Could You Be Loved",
          artist: "Bob Marley",
          album: "Uprising",
          duration: "3:57",
          cover: "https://images.unsplash.com/photo-1612265314771-2f0a4348a3ab"
        }
      ]
    }
  ],
  artists: [
    {
      id: 201,
      name: "Drake",
      followers: "85,429,847",
      cover: "https://images.unsplash.com/photo-1415886541506-6efc5e4b1786",
      isFollowing: false,
      topTracks: [
        {
          id: 103,
          name: "God's Plan",
          artist: "Drake",
          album: "Scorpion",
          duration: "3:18",
          cover: "https://images.unsplash.com/photo-1415886541506-6efc5e4b1786"
        },
        {
          id: 104,
          name: "One Dance",
          artist: "Drake",
          album: "Views",
          duration: "2:54",
          cover: "https://images.unsplash.com/photo-1415886541506-6efc5e4b1786"
        },
        {
          id: 125,
          name: "In My Feelings",
          artist: "Drake",
          album: "Scorpion",
          duration: "3:37",
          cover: "https://images.unsplash.com/photo-1415886541506-6efc5e4b1786"
        }
      ]
    },
    {
      id: 202,
      name: "Taylor Swift",
      followers: "95,234,567",
      cover: "https://images.pexels.com/photos/9001962/pexels-photo-9001962.jpeg",
      isFollowing: true,
      topTracks: [
        {
          id: 102,
          name: "Anti-Hero",
          artist: "Taylor Swift",
          album: "Midnights",
          duration: "3:20",
          cover: "https://images.pexels.com/photos/9001962/pexels-photo-9001962.jpeg"
        },
        {
          id: 126,
          name: "Shake It Off",
          artist: "Taylor Swift",
          album: "1989",
          duration: "3:39",
          cover: "https://images.pexels.com/photos/9001962/pexels-photo-9001962.jpeg"
        },
        {
          id: 127,
          name: "Blank Space",
          artist: "Taylor Swift",
          album: "1989",
          duration: "3:51",
          cover: "https://images.pexels.com/photos/9001962/pexels-photo-9001962.jpeg"
        }
      ]
    },
    {
      id: 203,
      name: "The Weeknd",
      followers: "78,543,210",
      cover: "https://images.unsplash.com/photo-1516981442399-a91139e20ff8",
      isFollowing: false,
      topTracks: [
        {
          id: 105,
          name: "Blinding Lights",
          artist: "The Weeknd",
          album: "After Hours",
          duration: "3:20",
          cover: "https://images.unsplash.com/photo-1516981442399-a91139e20ff8"
        },
        {
          id: 128,
          name: "Can't Feel My Face",
          artist: "The Weeknd",
          album: "Beauty Behind the Madness",
          duration: "3:35",
          cover: "https://images.unsplash.com/photo-1516981442399-a91139e20ff8"
        }
      ]
    }
  ],
  albums: [
    {
      id: 301,
      name: "Midnights",
      artist: "Taylor Swift",
      year: "2022",
      cover: "https://images.pexels.com/photos/9001962/pexels-photo-9001962.jpeg",
      tracks: [
        {
          id: 102,
          name: "Anti-Hero",
          artist: "Taylor Swift",
          album: "Midnights",
          duration: "3:20",
          cover: "https://images.pexels.com/photos/9001962/pexels-photo-9001962.jpeg"
        },
        {
          id: 129,
          name: "Lavender Haze",
          artist: "Taylor Swift",
          album: "Midnights",
          duration: "3:22",
          cover: "https://images.pexels.com/photos/9001962/pexels-photo-9001962.jpeg"
        },
        {
          id: 130,
          name: "Karma",
          artist: "Taylor Swift",
          album: "Midnights",
          duration: "3:25",
          cover: "https://images.pexels.com/photos/9001962/pexels-photo-9001962.jpeg"
        }
      ]
    },
    {
      id: 302,
      name: "After Hours",
      artist: "The Weeknd",
      year: "2020",
      cover: "https://images.unsplash.com/photo-1516981442399-a91139e20ff8",
      tracks: [
        {
          id: 105,
          name: "Blinding Lights",
          artist: "The Weeknd",
          album: "After Hours",
          duration: "3:20",
          cover: "https://images.unsplash.com/photo-1516981442399-a91139e20ff8"
        },
        {
          id: 131,
          name: "After Hours",
          artist: "The Weeknd",
          album: "After Hours",
          duration: "6:01",
          cover: "https://images.unsplash.com/photo-1516981442399-a91139e20ff8"
        }
      ]
    },
    {
      id: 303,
      name: "Scorpion",
      artist: "Drake",
      year: "2018",
      cover: "https://images.unsplash.com/photo-1415886541506-6efc5e4b1786",
      tracks: [
        {
          id: 103,
          name: "God's Plan",
          artist: "Drake",
          album: "Scorpion",
          duration: "3:18",
          cover: "https://images.unsplash.com/photo-1415886541506-6efc5e4b1786"
        },
        {
          id: 125,
          name: "In My Feelings",
          artist: "Drake",
          album: "Scorpion",
          duration: "3:37",
          cover: "https://images.unsplash.com/photo-1415886541506-6efc5e4b1786"
        }
      ]
    }
  ]
};

// Icons Component
const Icons = {
  Home: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 0 1 3 0l7.5 4.33a2 2 0 0 1 1 1.732V20a2 2 0 0 1-2 2h-4.5a1 1 0 0 1-1-1v-4h-3v4a1 1 0 0 1-1 1H4a2 2 0 0 1-2-2V7.577a2 2 0 0 1 1-1.732l7.5-4.33z"/>
    </svg>
  ),
  Search: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 1 0 1.414-1.414l-4.353-4.353a9.047 9.047 0 0 0 2.058-5.907c0-5.139-4.226-9.279-9.407-9.279zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z"/>
    </svg>
  ),
  Library: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1.5.866l6-3a1 1 0 0 0 0-1.732l-6-3a1 1 0 0 0-1.5.866V3a1 1 0 0 0-1.5-.866l-6 3a1 1 0 0 0 0 1.732l6 3z"/>
    </svg>
  ),
  Play: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7.05 3.606l13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"/>
    </svg>
  ),
  Pause: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z"/>
    </svg>
  ),
  Heart: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M15.724 4.22A4.313 4.313 0 0 0 12.192.814a4.269 4.269 0 0 0-3.622 1.13.837.837 0 0 1-1.14 0 4.272 4.272 0 0 0-6.21 5.855l5.916 7.05a1.128 1.128 0 0 0 1.727 0l5.916-7.05a4.228 4.228 0 0 0 .945-3.577z"/>
    </svg>
  ),
  Volume: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M9.741.85a.8.8 0 0 1 .375.65v13a.8.8 0 0 1-1.125.73L6.425 14.4H2.8a.8.8 0 0 1-.8-.8V9.6a.8.8 0 0 1 .8-.8h3.625l2.566-.83A.8.8 0 0 1 9.741.85z"/>
    </svg>
  ),
  Skip: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z"/>
    </svg>
  ),
  Shuffle: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M13.151.922a.75.75 0 1 0-1.06 1.06L13.109 3H11.16a3.75 3.75 0 0 0-2.873 1.34l-6.173 7.356A2.25 2.25 0 0 1 .39 12.5H0V14h.391a3.75 3.75 0 0 0 2.873-1.34l6.173-7.356a2.25 2.25 0 0 1 1.724-.804h1.947l-1.017 1.018a.75.75 0 0 0 1.06 1.06L15.98 3.75 13.15.922zM.391 3.5H0V2h.391c1.109 0 2.16.49 2.873 1.34L4.89 5.277l-.979 1.167-1.796-2.14A2.25 2.25 0 0 0 .39 3.5z"/>
    </svg>
  ),
  Repeat: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M0 4.75A3.75 3.75 0 0 1 3.75 1h.75a.75.75 0 0 1 0 1.5H3.75A2.25 2.25 0 0 0 1.5 4.75v3.5a.75.75 0 0 1-1.5 0v-3.5zm12.5 6.5A3.75 3.75 0 0 1 8.75 15h-.75a.75.75 0 0 1 0-1.5h.75a2.25 2.25 0 0 0 2.25-2.25v-3.5a.75.75 0 0 1 1.5 0v3.5z"/>
    </svg>
  ),
  More: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M3 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm6.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM16 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
    </svg>
  ),
  Plus: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H.75a.75.75 0 0 1 0-1.5h6.5V.75a.75.75 0 0 1 1.5 0v6.5h5.75a.75.75 0 0 1 .75.75z"/>
    </svg>
  ),
  Arrow: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M14 10 8 4l-6 6h12z"/>
    </svg>
  )
};

// Sidebar Component
export const Sidebar = ({ searchQuery, setSearchQuery }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const menuItems = [
    { icon: Icons.Home, label: "Home", path: "/" },
    { icon: Icons.Search, label: "Search", path: "/search" },
    { icon: Icons.Library, label: "Your Library", path: "/library" }
  ];

  const playlists = [
    { name: "Liked Songs", path: "/liked" },
    { name: "My Playlist #1", path: "/playlist/1" },
    { name: "My Playlist #2", path: "/playlist/2" },
    { name: "Recently Played", path: "/recent" },
    { name: "Downloaded", path: "/downloaded" }
  ];

  return (
    <div className="w-64 bg-black p-6 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white flex items-center">
          <span className="text-green-500">●</span>
          <span className="ml-2">Spotify</span>
        </h1>
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-4">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`flex items-center space-x-3 text-sm font-medium p-2 rounded transition-colors ${
                  location.pathname === item.path
                    ? "text-white bg-gray-800"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`}
              >
                <item.icon />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-400 font-medium">PLAYLISTS</span>
            <button className="text-gray-400 hover:text-white">
              <Icons.Plus />
            </button>
          </div>
          <ul className="space-y-2">
            {playlists.map((playlist, index) => (
              <li key={index}>
                <Link
                  to={playlist.path}
                  className="block text-sm text-gray-300 hover:text-white py-1 transition-colors"
                >
                  {playlist.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

// Top Bar Component
export const TopBar = ({ searchQuery, setSearchQuery }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    if (location.pathname !== "/search") {
      navigate("/search");
    }
  };

  return (
    <div className="bg-black bg-opacity-95 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => window.history.back()}
            className="w-8 h-8 bg-black bg-opacity-70 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-colors"
          >
            <Icons.Arrow />
          </button>
          <button
            onClick={() => window.history.forward()}
            className="w-8 h-8 bg-black bg-opacity-70 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-colors rotate-180"
          >
            <Icons.Arrow />
          </button>
          
          {location.pathname === "/search" && (
            <div className="relative">
              <input
                type="text"
                placeholder="What do you want to listen to?"
                value={searchQuery}
                onChange={handleSearch}
                className="w-80 bg-white text-black rounded-full px-12 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <Icons.Search className="absolute left-4 top-2.5 text-black" />
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="bg-black bg-opacity-70 hover:bg-opacity-100 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
            Install App
          </button>
          
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
            >
              <span className="text-sm font-medium">U</span>
            </button>
            
            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-2 z-50">
                <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-gray-700">
                  Account
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-gray-700">
                  Profile
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-gray-700">
                  Settings
                </a>
                <hr className="border-gray-700 my-2" />
                <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-gray-700">
                  Log out
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Music Player Component
export const MusicPlayer = ({
  currentTrack,
  isPlaying,
  currentTime,
  duration,
  volume,
  isLiked,
  togglePlay,
  nextTrack,
  prevTrack,
  seek,
  changeVolume,
  toggleLike,
  setCurrentTime,
  setDuration,
  audioRef
}) => {
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const progressBarRef = useRef(null);
  const volumeBarRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e) => {
    const rect = progressBarRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    seek(newTime);
  };

  const handleVolumeClick = (e) => {
    const rect = volumeBarRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    changeVolume(percent);
  };

  return (
    <div className="bg-gray-900 border-t border-gray-800 px-4 py-3 flex items-center justify-between">
      <audio
        ref={audioRef}
        src={currentTrack.preview_url}
        onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.target.duration)}
        onEnded={nextTrack}
        autoPlay={isPlaying}
      />
      
      {/* Track Info */}
      <div className="flex items-center space-x-3 w-1/4">
        <img
          src={currentTrack.cover}
          alt={currentTrack.name}
          className="w-14 h-14 rounded"
        />
        <div className="min-w-0">
          <p className="text-white text-sm font-medium truncate">{currentTrack.name}</p>
          <p className="text-gray-400 text-xs truncate">{currentTrack.artist}</p>
        </div>
        <button
          onClick={toggleLike}
          className={`p-2 rounded-full transition-colors ${
            isLiked ? "text-green-500" : "text-gray-400 hover:text-white"
          }`}
        >
          <Icons.Heart />
        </button>
      </div>
      
      {/* Player Controls */}
      <div className="flex flex-col items-center space-y-2 w-1/2">
        <div className="flex items-center space-x-4">
          <button className="text-gray-400 hover:text-white transition-colors">
            <Icons.Shuffle />
          </button>
          <button
            onClick={prevTrack}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Icons.Skip className="rotate-180" />
          </button>
          <button
            onClick={togglePlay}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
          >
            {isPlaying ? <Icons.Pause className="text-black" /> : <Icons.Play className="text-black" />}
          </button>
          <button
            onClick={nextTrack}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Icons.Skip />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <Icons.Repeat />
          </button>
        </div>
        
        <div className="flex items-center space-x-2 w-full">
          <span className="text-xs text-gray-400">{formatTime(currentTime)}</span>
          <div
            ref={progressBarRef}
            className="flex-1 bg-gray-600 rounded-full h-1 cursor-pointer"
            onClick={handleProgressClick}
          >
            <div
              className="bg-white rounded-full h-1 transition-all duration-100"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
          <span className="text-xs text-gray-400">{formatTime(duration)}</span>
        </div>
      </div>
      
      {/* Volume Controls */}
      <div className="flex items-center space-x-2 w-1/4 justify-end">
        <button
          onClick={() => setShowVolumeSlider(!showVolumeSlider)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <Icons.Volume />
        </button>
        <div
          ref={volumeBarRef}
          className="w-20 bg-gray-600 rounded-full h-1 cursor-pointer"
          onClick={handleVolumeClick}
        >
          <div
            className="bg-white rounded-full h-1 transition-all duration-100"
            style={{ width: `${volume * 100}%` }}
          />
        </div>
        <button className="text-gray-400 hover:text-white transition-colors">
          <Icons.More />
        </button>
      </div>
    </div>
  );
};

// Track List Component
export const TrackList = ({ tracks, playTrack, playlist }) => {
  const [hoveredTrack, setHoveredTrack] = useState(null);

  return (
    <div className="mt-6">
      <div className="grid grid-cols-12 gap-4 text-sm text-gray-400 border-b border-gray-800 pb-2 mb-4">
        <div className="col-span-1">#</div>
        <div className="col-span-6">TITLE</div>
        <div className="col-span-3">ALBUM</div>
        <div className="col-span-2">TIME</div>
      </div>
      
      {tracks.map((track, index) => (
        <div
          key={track.id}
          className="grid grid-cols-12 gap-4 text-sm py-2 px-2 rounded hover:bg-gray-800 transition-colors group cursor-pointer"
          onMouseEnter={() => setHoveredTrack(track.id)}
          onMouseLeave={() => setHoveredTrack(null)}
          onClick={() => playTrack(track, playlist, index)}
        >
          <div className="col-span-1 flex items-center">
            {hoveredTrack === track.id ? (
              <Icons.Play className="text-white" />
            ) : (
              <span className="text-gray-400">{index + 1}</span>
            )}
          </div>
          <div className="col-span-6 flex items-center space-x-3">
            <img src={track.cover} alt={track.name} className="w-10 h-10 rounded" />
            <div>
              <p className="text-white font-medium">{track.name}</p>
              <p className="text-gray-400">{track.artist}</p>
            </div>
          </div>
          <div className="col-span-3 flex items-center text-gray-400">
            {track.album}
          </div>
          <div className="col-span-2 flex items-center text-gray-400">
            {track.duration}
          </div>
        </div>
      ))}
    </div>
  );
};

// Card Component
export const Card = ({ item, onClick, showPlayButton = true }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-gray-900 p-4 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={item.cover}
          alt={item.name}
          className="w-full aspect-square object-cover rounded-md mb-4"
        />
        {showPlayButton && isHovered && (
          <button className="absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-400 transition-colors shadow-lg">
            <Icons.Play className="text-black ml-1" />
          </button>
        )}
      </div>
      <h3 className="text-white font-medium mb-2 line-clamp-1">{item.name}</h3>
      <p className="text-gray-400 text-sm line-clamp-2">
        {item.description || item.artist || `${item.tracks?.length || 0} songs`}
      </p>
    </div>
  );
};

// Home Page Component
export const HomePage = ({ playTrack }) => {
  const navigate = useNavigate();

  const handleCardClick = (item) => {
    if (item.type === "playlist") {
      navigate(`/playlist/${item.id}`);
    } else if (item.type === "artist") {
      navigate(`/artist/${item.id}`);
    } else if (item.type === "album") {
      navigate(`/album/${item.id}`);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-6">
          Good {new Date().getHours() < 12 ? "morning" : new Date().getHours() < 18 ? "afternoon" : "evening"}
        </h1>
        
        <div className="grid grid-cols-3 gap-4 mb-8">
          {mockData.recentlyPlayed.slice(0, 6).map((item) => (
            <div
              key={item.id}
              className="bg-gray-800 hover:bg-gray-700 rounded flex items-center cursor-pointer transition-colors group"
              onClick={() => handleCardClick(item)}
            >
              <img
                src={item.cover}
                alt={item.name}
                className="w-20 h-20 rounded-l"
              />
              <div className="flex-1 px-4">
                <p className="text-white font-medium">{item.name}</p>
              </div>
              <div className="pr-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-400 transition-colors">
                  <Icons.Play className="text-black ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Made for you</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {mockData.featuredPlaylists.slice(0, 6).map((playlist) => (
            <Card
              key={playlist.id}
              item={playlist}
              onClick={() => handleCardClick(playlist)}
            />
          ))}
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Recently played</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {mockData.recentlyPlayed.map((item) => (
            <Card
              key={item.id}
              item={item}
              onClick={() => handleCardClick(item)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Search Page Component
export const SearchPage = ({ searchQuery, playTrack }) => {
  const [searchResults, setSearchResults] = useState({
    tracks: [],
    artists: [],
    albums: [],
    playlists: []
  });

  const browseCategories = [
    { name: "Hip-Hop", color: "bg-red-500", cover: "https://images.unsplash.com/photo-1415886541506-6efc5e4b1786" },
    { name: "Pop", color: "bg-pink-500", cover: "https://images.unsplash.com/photo-1516981442399-a91139e20ff8" },
    { name: "Rock", color: "bg-orange-500", cover: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee" },
    { name: "Jazz", color: "bg-blue-500", cover: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f" },
    { name: "Electronic", color: "bg-purple-500", cover: "https://images.unsplash.com/photo-1599423424751-54e0c1187a02" },
    { name: "Country", color: "bg-green-500", cover: "https://images.unsplash.com/photo-1598901704027-18db7e0e8c60" },
    { name: "Classical", color: "bg-yellow-500", cover: "https://images.unsplash.com/photo-1519683109079-d5f539e1542f" },
    { name: "Reggae", color: "bg-teal-500", cover: "https://images.unsplash.com/photo-1612265314771-2f0a4348a3ab" }
  ];

  useEffect(() => {
    if (searchQuery) {
      // Mock search results
      const mockTracks = mockData.featuredPlaylists.flatMap(p => p.tracks).filter(track => 
        track.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.artist.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      const mockArtists = mockData.artists.filter(artist =>
        artist.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      const mockPlaylists = mockData.featuredPlaylists.filter(playlist =>
        playlist.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setSearchResults({
        tracks: mockTracks,
        artists: mockArtists,
        albums: [],
        playlists: mockPlaylists
      });
    } else {
      setSearchResults({ tracks: [], artists: [], albums: [], playlists: [] });
    }
  }, [searchQuery]);

  if (!searchQuery) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-white mb-6">Browse all</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {browseCategories.map((category, index) => (
            <div
              key={index}
              className={`${category.color} rounded-lg p-6 relative overflow-hidden cursor-pointer hover:scale-105 transition-transform`}
            >
              <h3 className="text-white font-bold text-xl mb-4">{category.name}</h3>
              <img
                src={category.cover}
                alt={category.name}
                className="absolute -bottom-4 -right-4 w-20 h-20 object-cover rounded transform rotate-12"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-white mb-6">Search results for "{searchQuery}"</h1>
      
      {searchResults.tracks.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Songs</h2>
          <div className="space-y-2">
            {searchResults.tracks.slice(0, 4).map((track) => (
              <div
                key={track.id}
                className="flex items-center space-x-4 p-2 rounded hover:bg-gray-800 transition-colors cursor-pointer"
                onClick={() => playTrack(track)}
              >
                <img src={track.cover} alt={track.name} className="w-12 h-12 rounded" />
                <div className="flex-1">
                  <p className="text-white font-medium">{track.name}</p>
                  <p className="text-gray-400 text-sm">{track.artist}</p>
                </div>
                <span className="text-gray-400 text-sm">{track.duration}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {searchResults.artists.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Artists</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {searchResults.artists.map((artist) => (
              <Card
                key={artist.id}
                item={artist}
                onClick={() => {}}
                showPlayButton={false}
              />
            ))}
          </div>
        </div>
      )}
      
      {searchResults.playlists.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Playlists</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {searchResults.playlists.map((playlist) => (
              <Card
                key={playlist.id}
                item={playlist}
                onClick={() => {}}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Library Page Component
export const LibraryPage = ({ playTrack }) => {
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState("list");
  
  const filters = [
    { key: "all", label: "All" },
    { key: "playlists", label: "Playlists" },
    { key: "artists", label: "Artists" },
    { key: "albums", label: "Albums" }
  ];

  const getFilteredItems = () => {
    let items = [];
    
    if (filter === "all" || filter === "playlists") {
      items = [...items, ...mockData.featuredPlaylists];
    }
    if (filter === "all" || filter === "artists") {
      items = [...items, ...mockData.artists];
    }
    if (filter === "all" || filter === "albums") {
      items = [...items, ...mockData.albums];
    }
    
    return items;
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Your Library</h1>
        <div className="flex items-center space-x-4">
          <div className="flex bg-gray-800 rounded-full p-1">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  filter === f.key
                    ? "bg-white text-black"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => setView(view === "list" ? "grid" : "list")}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {view === "list" ? "Grid" : "List"}
          </button>
        </div>
      </div>
      
      {view === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {getFilteredItems().map((item) => (
            <Card
              key={item.id}
              item={item}
              onClick={() => {}}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {getFilteredItems().map((item) => (
            <div
              key={item.id}
              className="flex items-center space-x-4 p-3 rounded hover:bg-gray-800 transition-colors cursor-pointer"
            >
              <img src={item.cover} alt={item.name} className="w-12 h-12 rounded" />
              <div className="flex-1">
                <p className="text-white font-medium">{item.name}</p>
                <p className="text-gray-400 text-sm">
                  {item.type === "artist" ? "Artist" : item.description || `${item.tracks?.length || 0} songs`}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Playlist Page Component
export const PlaylistPage = ({ playTrack }) => {
  const { id } = useParams();
  const playlist = mockData.featuredPlaylists.find(p => p.id === parseInt(id));
  
  if (!playlist) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-white">Playlist not found</h1>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-end space-x-6 mb-8">
        <img
          src={playlist.cover}
          alt={playlist.name}
          className="w-56 h-56 rounded-lg shadow-2xl"
        />
        <div>
          <p className="text-sm font-medium text-white uppercase tracking-wide">Playlist</p>
          <h1 className="text-6xl font-bold text-white mt-2 mb-6">{playlist.name}</h1>
          <p className="text-gray-300 mb-2">{playlist.description}</p>
          <p className="text-sm text-gray-400">
            Spotify • {playlist.tracks.length} songs
          </p>
        </div>
      </div>
      
      <div className="flex items-center space-x-6 mb-8">
        <button className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-400 transition-colors">
          <Icons.Play className="text-black ml-1 w-6 h-6" />
        </button>
        <button className="text-gray-400 hover:text-white transition-colors">
          <Icons.Heart className="w-8 h-8" />
        </button>
        <button className="text-gray-400 hover:text-white transition-colors">
          <Icons.More className="w-6 h-6" />
        </button>
      </div>
      
      <TrackList tracks={playlist.tracks} playTrack={playTrack} playlist={playlist} />
    </div>
  );
};

// Artist Page Component
export const ArtistPage = ({ playTrack }) => {
  const { id } = useParams();
  const artist = mockData.artists.find(a => a.id === parseInt(id));
  
  if (!artist) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-white">Artist not found</h1>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-end space-x-6 mb-8">
        <img
          src={artist.cover}
          alt={artist.name}
          className="w-56 h-56 rounded-full shadow-2xl"
        />
        <div>
          <p className="text-sm font-medium text-white uppercase tracking-wide">Artist</p>
          <h1 className="text-6xl font-bold text-white mt-2 mb-6">{artist.name}</h1>
          <p className="text-sm text-gray-400">
            {artist.followers} monthly listeners
          </p>
        </div>
      </div>
      
      <div className="flex items-center space-x-6 mb-8">
        <button className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-400 transition-colors">
          <Icons.Play className="text-black ml-1 w-6 h-6" />
        </button>
        <button className={`px-6 py-2 rounded-full border text-sm font-medium transition-colors ${
          artist.isFollowing
            ? "bg-white text-black border-white hover:bg-gray-200"
            : "text-white border-white hover:bg-white hover:text-black"
        }`}>
          {artist.isFollowing ? "Following" : "Follow"}
        </button>
        <button className="text-gray-400 hover:text-white transition-colors">
          <Icons.More className="w-6 h-6" />
        </button>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Popular</h2>
        <TrackList tracks={artist.topTracks} playTrack={playTrack} />
      </div>
    </div>
  );
};

// Album Page Component
export const AlbumPage = ({ playTrack }) => {
  const { id } = useParams();
  const album = mockData.albums.find(a => a.id === parseInt(id));
  
  if (!album) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-white">Album not found</h1>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-end space-x-6 mb-8">
        <img
          src={album.cover}
          alt={album.name}
          className="w-56 h-56 rounded-lg shadow-2xl"
        />
        <div>
          <p className="text-sm font-medium text-white uppercase tracking-wide">Album</p>
          <h1 className="text-6xl font-bold text-white mt-2 mb-6">{album.name}</h1>
          <p className="text-gray-300 mb-2">{album.artist}</p>
          <p className="text-sm text-gray-400">
            {album.year} • {album.tracks.length} songs
          </p>
        </div>
      </div>
      
      <div className="flex items-center space-x-6 mb-8">
        <button className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-400 transition-colors">
          <Icons.Play className="text-black ml-1 w-6 h-6" />
        </button>
        <button className="text-gray-400 hover:text-white transition-colors">
          <Icons.Heart className="w-8 h-8" />
        </button>
        <button className="text-gray-400 hover:text-white transition-colors">
          <Icons.More className="w-6 h-6" />
        </button>
      </div>
      
      <TrackList tracks={album.tracks} playTrack={playTrack} playlist={album} />
    </div>
  );
};