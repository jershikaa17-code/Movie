# CLAUDE.md

# Movie Explorer — React + TMDB

## 1. PROJECT OVERVIEW

Build a complete, production-quality Movie Explorer web application using React and the TMDB API.

The application should provide the visual experience of a modern premium streaming platform, strongly inspired by the dark cinematic layout, browsing experience, movie rows, hero sections, hover interactions, and responsive behavior commonly seen in streaming services such as Netflix.

IMPORTANT:

This is a Movie Explorer application, NOT a Netflix clone.

Do NOT copy:
- Netflix logo
- Netflix trademarks
- Netflix proprietary assets
- Netflix source code
- Netflix copyrighted UI assets
- Netflix proprietary API
- Netflix exact branding

Instead, create an original product called:

"Movie Explorer"

The visual direction can be inspired by modern streaming platforms while maintaining its own branding.

The application must use TMDB dynamically for movie information.

Do NOT create a static movie website.

---

# 2. PRIMARY GOAL

The final website should feel like a real streaming-platform product.

A user should be able to:

1. Open the website.
2. See a cinematic featured movie.
3. Browse trending movies.
4. Browse popular movies.
5. Browse now-playing movies.
6. Browse top-rated movies.
7. Browse upcoming movies.
8. Browse movies by genre.
9. Search for movies.
10. Open a movie.
11. View detailed movie information.
12. See similar/recommended movies.
13. Navigate between pages.
14. Use the application on desktop, tablet, and mobile.
15. Understand loading and error states clearly.

Everything movie-related should come from TMDB.

---

# 3. TECHNOLOGY STACK

Use:

- React
- Vite
- JavaScript
- CSS
- TMDB REST API
- React Router
- Fetch API or Axios

Avoid unnecessary dependencies.

Do not introduce a large UI framework such as:
- Bootstrap
- Material UI
- Ant Design

The UI should be custom-built.

---

# 4. PROJECT STRUCTURE

Use a clean structure similar to:

```text
movie-explorer/
│
├── public/
│   ├── favicon.svg
│   └── ...
│
├── src/
│   │
│   ├── api/
│   │   └── tmdb.js
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── MovieRow.jsx
│   │   ├── MovieCard.jsx
│   │   ├── SearchBar.jsx
│   │   ├── SearchResults.jsx
│   │   ├── MovieDetails.jsx
│   │   ├── GenreSection.jsx
│   │   ├── LoadingSkeleton.jsx
│   │   ├── MovieCardSkeleton.jsx
│   │   ├── HeroSkeleton.jsx
│   │   ├── ErrorMessage.jsx
│   │   ├── EmptyState.jsx
│   │   ├── Footer.jsx
│   │   └── ScrollToTop.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Search.jsx
│   │   ├── MovieDetailsPage.jsx
│   │   ├── Popular.jsx
│   │   ├── TopRated.jsx
│   │   ├── Upcoming.jsx
│   │   └── NowPlaying.jsx
│   │
│   ├── hooks/
│   │   ├── useMovies.js
│   │   ├── useDebounce.js
│   │   └── useFetch.js
│   │
│   ├── utils/
│   │   ├── imageUtils.js
│   │   ├── formatters.js
│   │   └── constants.js
│   │
│   ├── styles/
│   │   ├── global.css
│   │   ├── navbar.css
│   │   ├── hero.css
│   │   ├── movie-card.css
│   │   ├── movie-row.css
│   │   ├── search.css
│   │   └── movie-details.css
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env
├── .env.example
├── .gitignore
├── CLAUDE.md
├── package.json
└── README.md

You may adjust the structure if needed, but maintain separation between:

API logic
UI
pages
hooks
utility functions
styling
5. ENVIRONMENT VARIABLES

Create:

.env

with:

VITE_TMDB_API_KEY=YOUR_TMDB_API_KEY

Create:

.env.example

with:

VITE_TMDB_API_KEY=

IMPORTANT:

Never hardcode the actual TMDB API key into source files.

Never commit .env.

Add .env to .gitignore.

6. TMDB API

Use:

https://api.themoviedb.org/3

The API layer must be centralized.

Create:

src/api/tmdb.js

Do not make API requests directly inside every component.

7. IMAGE URLS

Use TMDB image URLs.

Poster:

https://image.tmdb.org/t/p/w500/

Large poster:

https://image.tmdb.org/t/p/w780/

Backdrop:

https://image.tmdb.org/t/p/original/

Create reusable helper functions.

Example:

getPosterUrl(path)
getBackdropUrl(path)

If the image path is missing, return a proper fallback.

Never allow broken image icons to appear in the UI.

8. API FUNCTIONS

Create reusable functions:

getTrendingMovies()
getPopularMovies()
getNowPlayingMovies()
getTopRatedMovies()
getUpcomingMovies()

searchMovies(query)

getMovieDetails(id)

getSimilarMovies(id)

getMovieCredits(id)

getMoviesByGenre(genreId)

Each function should:

Make the request.
Check HTTP status.
Parse JSON.
Return predictable data.
Throw useful errors.

Do not silently swallow API errors.

9. API ENDPOINTS

Use appropriate TMDB endpoints such as:

/trending/movie/week
/movie/popular
/movie/now_playing
/movie/top_rated
/movie/upcoming
/search/movie
/movie/{movie_id}
/movie/{movie_id}/similar
/movie/{movie_id}/credits
/discover/movie

Use query parameters appropriately.

Do not hardcode movie IDs unless a specific ID is required for testing.

10. HOME PAGE

The home page should have the following structure:

NAVBAR

        ↓

FEATURED HERO

        ↓

Trending Now

[ Movie ][ Movie ][ Movie ][ Movie ][ Movie ]

        ↓

Popular Movies

[ Movie ][ Movie ][ Movie ][ Movie ][ Movie ]

        ↓

Now Playing

[ Movie ][ Movie ][ Movie ][ Movie ][ Movie ]

        ↓

Top Rated

[ Movie ][ Movie ][ Movie ][ Movie ][ Movie ]

        ↓

Upcoming

[ Movie ][ Movie ][ Movie ][ Movie ][ Movie ]

        ↓

Action

[ Movie ][ Movie ][ Movie ][ Movie ][ Movie ]

        ↓

Comedy

[ Movie ][ Movie ][ Movie ][ Movie ][ Movie ]

        ↓

Horror

[ Movie ][ Movie ][ Movie ][ Movie ][ Movie ]

        ↓

Science Fiction

[ Movie ][ Movie ][ Movie ][ Movie ][ Movie ]

        ↓

Animation

[ Movie ][ Movie ][ Movie ][ Movie ][ Movie ]

        ↓

FOOTER
11. NAVBAR

Create a premium sticky navigation.

Desktop:

Movie Explorer

Home
Popular
Now Playing
Top Rated
Upcoming

                         Search
                         Profile

The navbar should initially blend with the hero.

When the user scrolls:

Add a dark background.
Add subtle blur if appropriate.
Add smooth transition.
Maintain readability.

Do not make the navbar excessively tall.

12. NAVIGATION ROUTES

Create:

/

Home.

/popular

Popular movies.

/now-playing

Now playing.

/top-rated

Top-rated movies.

/upcoming

Upcoming movies.

/search?q=batman

Search results.

/movie/:id

Movie details.

Use React Router.

13. MOBILE NAVIGATION

On smaller screens:

Hide desktop navigation links.

Show:

Movie Explorer
Search
Menu

Menu opens a polished mobile navigation panel.

Menu options:

Home
Popular
Now Playing
Top Rated
Upcoming

The mobile menu should close when:

A navigation item is selected.
User clicks outside.
User presses close.

Do not leave the menu permanently visible.

14. HERO SECTION

The hero is one of the most important parts of the design.

Use a dynamically fetched trending/popular movie.

Hero should contain:

Full-width backdrop
Large movie title
Rating
Release year
Runtime
Genres
Overview
Action buttons

Example structure:

------------------------------------------------
|                                              |
|                BACKDROP IMAGE                |
|                                              |
|                                              |
|       MOVIE TITLE                            |
|       ★ 8.7   2026   2h 14m                 |
|                                              |
|       A short movie overview goes here...    |
|                                              |
|       [ ▶ Play ] [ + My List ] [ More Info ] |
|                                              |
------------------------------------------------

Hero content should be positioned toward the lower-left.

15. HERO GRADIENT

The backdrop must remain readable.

Use:

Bottom gradient.
Left gradient.
Overall dark overlay.

The bottom of the hero should blend naturally into the page background.

Avoid a harsh visible rectangular boundary.

16. HERO RESPONSIVENESS

Desktop:

Hero height approximately 70–85vh.
Large title.
Wide content area.

Tablet:

Reduce hero height.
Reduce title size.
Reduce overview width.

Mobile:

Hero approximately 55–70vh.
Smaller title.
Compact metadata.
Shorter overview.
Buttons fit comfortably.

Do not allow content to overflow horizontally.

17. HERO BUTTONS

Primary:

▶ Play

Secondary:

+ My List

Tertiary:

More Info

Buttons must:

Have hover states.
Have focus states.
Be keyboard accessible.
Be touch-friendly on mobile.
18. PLAY BUTTON

There is no requirement to actually stream a movie.

Do NOT attempt to illegally stream movies.

The Play button may:

Open a movie detail modal.
Navigate to movie details.
Show a "Trailer unavailable" state.

If TMDB trailer data is implemented, use an official YouTube trailer where appropriate.

Do not embed pirated streams.

19. MOVIE ROWS

Movie rows should resemble premium streaming carousels.

Each row contains:

SECTION TITLE

< [ Movie ] [ Movie ] [ Movie ] [ Movie ] [ Movie ] >

Horizontal scrolling must be smooth.

Desktop:

Show navigation arrows when useful.

Mobile:

Allow touch swipe.
Hide unnecessary arrows.
20. MOVIE CARD DIMENSIONS

Desktop:

Use a consistent aspect ratio around:

2 / 3

Cards should not become excessively wide.

Mobile:

Cards become smaller while maintaining poster ratio.

Keep consistent gaps.

21. MOVIE CARD NORMAL STATE

Display:

Poster
Optional title below card
Rating if appropriate

Do not overcrowd the card.

22. MOVIE CARD HOVER

On desktop hover:

Card scales slightly.
Image becomes slightly larger/brighter.
Dark overlay appears.
Movie information appears.
Buttons appear.

Show:

Movie Title

★ 8.5

2026

Short overview...

[ Play ] [ + ]

Animation should be approximately 200–350ms.

Do not create extreme scaling.

Cards must not cause surrounding layout to jump.

23. MOVIE CARD MOBILE

Do NOT depend on hover on mobile.

Mobile users should still be able to access movie details.

Clicking a card should navigate to:

/movie/:id
24. SEARCH SYSTEM

Create a dedicated search interface.

Desktop:

Click Search icon.

Expand the search input smoothly.

Mobile:

Search should become a full-width interface.

Placeholder:

Search movies...
25. SEARCH BEHAVIOR

Search should:

Wait until the user types.
Debounce requests.
Avoid API request on every keystroke.
Show loading state.
Display results.
Handle empty search.

Suggested debounce:

300–500ms

Do not search for empty strings.

26. SEARCH RESULTS

Route:

/search?q=query

Display:

Search results for "query"

Then a responsive grid.

Desktop:

4–6 columns.

Tablet:

3–4 columns.

Mobile:

2 columns.

27. SEARCH EMPTY STATE

If there are no results:

Display a polished empty state.

Example:

No movies found

We couldn't find anything matching your search.

Try another title or keyword.

Do not display fake recommendations unless explicitly implemented.

28. MOVIE DETAILS PAGE

Route:

/movie/:id

Use the TMDB movie ID.

The page should have a cinematic layout.

Desktop:

------------------------------------------------
|                                              |
|              BACKDROP                       |
|                                              |
|       [ POSTER ]    TITLE                    |
|                    Rating                    |
|                    Release Date              |
|                    Runtime                   |
|                    Genres                    |
|                                              |
|                    Overview                  |
|                                              |
------------------------------------------------
29. MOVIE DETAILS CONTENT

Show:

Movie title
Original title if useful
Rating
Vote count
Release date
Runtime
Genres
Overview
Popularity
Poster
Backdrop

Do not display undefined/null values.

30. SIMILAR MOVIES

At the bottom:

More Like This

Fetch from TMDB.

Use the same reusable MovieCard component.

Do not duplicate card code.

31. LOADING STATES

Every API-driven section needs a loading state.

Do NOT use only:

Loading...

Create skeleton components.

Examples:

HeroSkeleton
MovieCardSkeleton
MovieRowSkeleton
MovieDetailsSkeleton

Skeletons should have:

Correct dimensions.
Dark surfaces.
Subtle shimmer animation.
32. ERROR STATES

Errors should be user-friendly.

Do not expose raw API errors such as:

AxiosError 401

Instead show:

Something went wrong

We couldn't load this content right now.

[ Try Again ]

Log technical errors to the console for development.

33. IMAGE FALLBACKS

TMDB may return:

poster_path: null

or:

backdrop_path: null

Handle this.

Use a custom Movie Explorer fallback.

Do not show broken image icons.

34. EMPTY DATA HANDLING

If a section returns no movies:

Do not break the layout.

Either:

Hide the section.
Or show a compact empty state.

Never render empty rows.

35. FOOTER

Create a minimal premium footer.

Include:

Movie Explorer

Explore movies, discover stories.

Home
Popular
Top Rated
Upcoming
Search

Include appropriate TMDB attribution.

Follow TMDB attribution requirements.

Do not imply that TMDB endorses the application.

36. VISUAL DESIGN

The website should use a cinematic dark theme.

Recommended base:

background: #050505;

Secondary:

#111111
#181818
#222222

Text:

#FFFFFF
#B3B3B3
#8A8A8A

Accent:

#E50914

The accent can be adjusted slightly to create an original brand identity.

Do not use excessive red.

Use red primarily for:

Primary buttons.
Active navigation.
Important actions.
Small highlights.
37. TYPOGRAPHY

Use a modern sans-serif font.

Preferred:

Inter

or another clean modern sans-serif.

Typography hierarchy:

Hero title:

Very large.
Bold.
Tight line height.

Section titles:

Large.
Bold.

Movie titles:

Medium/bold.

Metadata:

Small.
Gray.

Descriptions:

Comfortable line height.

Avoid decorative fonts.

38. SPACING

Use a consistent spacing system.

Examples:

8px
12px
16px
24px
32px
48px
64px
80px

Do not randomly assign margins.

Sections should have consistent vertical spacing.

39. PAGE BACKGROUND

The entire page should remain dark.

Avoid:

White page backgrounds.
Bright cards.
Colorful dashboard panels.
Excessive borders.

Use depth through:

Shadows.
Gradients.
Image overlays.
Contrast.
Spacing.
40. ANIMATIONS

Animations should feel premium.

Implement:

Navbar

Smooth background transition when scrolling.

Hero

Fade and slide content into view.

Movie Cards

Scale:

1 → approximately 1.04

Do not scale excessively.

Buttons

Subtle background/transform transition.

Search

Smooth expansion.

Page transitions

Use subtle fade/slide where appropriate.

Skeleton

Use shimmer.

41. ACCESSIBILITY

Implement:

Semantic HTML.
Alt text.
Keyboard navigation.
Visible focus states.
Accessible buttons.
Proper aria-labels.
Sufficient contrast.
Keyboard-accessible navigation.

Do not use clickable <div> elements where a button or link is appropriate.

42. RESPONSIVE BREAKPOINTS

Support at least:

375px
480px
768px
1024px
1280px
1440px
1920px

Use CSS media queries.

Test actual layouts at these widths.

43. MOBILE REQUIREMENTS

At mobile widths:

No horizontal page overflow.
Hero fits within viewport.
Navbar remains usable.
Movie rows scroll horizontally.
Movie grid becomes 2 columns.
Buttons remain tappable.
Search remains usable.
Movie details stack vertically.
Text does not overflow.
Images maintain aspect ratio.
44. TABLET REQUIREMENTS

At tablet widths:

Navigation should remain usable.
Hero should resize.
Movie rows should show fewer cards.
Search grid should use 3–4 columns.
Movie details should adapt gracefully.
45. DESKTOP REQUIREMENTS

At desktop widths:

Use full available space.
Keep content centered.
Avoid excessively wide text.
Hero should be immersive.
Movie rows should use the available width.
Cards should remain consistent.
46. API CACHING

Avoid unnecessary repeated requests.

If the user returns to the home page, do not immediately fetch every section again if the data is already available.

Use a simple caching strategy where appropriate.

Do not over-engineer this.

47. SEARCH CACHING

Avoid repeatedly fetching the same query.

Example:

batman
batman
batman

should not create unnecessary duplicate requests.

48. ERROR RETRY

For failed API sections:

Display:

Unable to load movies

[ Retry ]

Retry only the failed request.

Do not reload the entire application.

49. API KEY SECURITY

IMPORTANT:

TMDB API keys in frontend applications cannot be truly secret because browser requests expose them.

For this project:

Store the key in .env.
Do not hardcode it.
Do not commit .env.
Provide .env.example.

If this becomes a production application, recommend a backend/proxy layer.

50. PERFORMANCE

Optimize:

Images.
API requests.
React rendering.
Event handlers.
Search.
Carousels.

Use:

loading="lazy"

for images below the fold where appropriate.

The hero image can load eagerly.

Do not load huge original-resolution images for every movie card.

Use:

w500

for posters.

Use:

original

only where large hero imagery requires it.

51. COMPONENT REUSABILITY

Do not duplicate:

Movie cards.
Loading skeletons.
Error messages.
Buttons.
API logic.

For example, all movie rows should use:

<MovieRow />

All movie cards should use:

<MovieCard />
52. MOVIE ROW API PROPS

MovieRow should be reusable.

Example concept:

<MovieRow
  title="Trending Now"
  movies={trendingMovies}
/>

Do not create separate hardcoded components such as:

TrendingMovies.jsx
PopularMovies.jsx
TopRatedMovies.jsx

unless there is a real reason.

53. MOVIE CARD DATA

MovieCard should accept TMDB movie objects.

It should not require manually formatted movie data unless necessary.

Handle:

movie.id
movie.title
movie.poster_path
movie.backdrop_path
movie.vote_average
movie.release_date
movie.overview
54. GENRES

Use TMDB genre IDs.

Examples:

Action
Comedy
Horror
Science Fiction
Animation
Drama
Thriller
Romance

Do not hardcode movie lists.

Use TMDB discover endpoints.

55. GENRE DISPLAY

Use human-readable genre names.

Do not display:

genre_ids: [28, 35, 878]

Instead display:

Action • Comedy • Science Fiction
56. DATE FORMATTING

Convert TMDB dates into readable formats.

Example:

2026-08-17

becomes:

Aug 17, 2026

or:

17 Aug 2026

Keep formatting consistent.

57. RATING

TMDB ratings may contain many decimal places.

Display approximately:

8.4

instead of:

8.437829

Use a star or rating indicator:

★ 8.4

Do not invent ratings.

58. RUNTIME

TMDB runtime is in minutes.

Convert:

134

to:

2h 14m

Handle missing runtime.

59. MOVIE TITLE HANDLING

Long titles should not break cards.

Use:

line clamping.
proper overflow handling.
tooltip where useful.

Never allow long movie names to destroy the layout.

60. SCROLL BEHAVIOR

Use smooth scrolling where appropriate.

Movie rows:

Horizontal scrolling.
Mouse wheel support if practical.
Touch support.
Keyboard accessibility where practical.

Page:

Smooth navigation.
Scroll to top on route change.

Create:

ScrollToTop.jsx
61. URL BEHAVIOR

Search should use query parameters:

/search?q=avatar

Movie details:

/movie/123

Do not store search queries only in React state.

Refreshing the search page should preserve the query.

62. NO HARDCODED MOVIES

This is critical.

Do NOT write:

const movies = [
  {
    title: "Avatar",
    rating: 8.5
  }
]

as production data.

All movie data must be fetched from TMDB.

Hardcoded genre IDs and UI labels are acceptable.

63. NO STATIC POSTERS

Do not download random movie posters into /public.

Use TMDB image URLs.

Do not create fake poster images.

64. NO FAKE API

Do not create:

movies.json

as a replacement for TMDB.

Do not mock the API once integration is complete.

65. TRAILER SUPPORT

If trailer support is implemented:

Use TMDB videos endpoint:

/movie/{movie_id}/videos

Prefer official YouTube trailers.

Do not use illegal movie streams.

If no trailer exists:

Hide the trailer button or show an appropriate message.

66. MY LIST

If implementing My List:

Use browser localStorage.

Example:

movieExplorerMyList

Allow:

Add movie.
Remove movie.
Persist after refresh.

Do not require authentication for this feature.

If the feature becomes unnecessary, prioritize core browsing/search/details functionality.

67. PROFILE ICON

The profile icon is visual only unless authentication is implemented.

Do not create fake authentication.

68. NO LOGIN REQUIREMENT

Do not add a login system unless explicitly requested.

The core Movie Explorer must work without authentication.

69. ERROR BOUNDARY

If appropriate, create a React error boundary for unexpected rendering errors.

Show a friendly fallback rather than a blank screen.

70. CODE QUALITY

Use:

Clear naming.
Small reusable components.
No unnecessary duplication.
No giant component files where avoidable.
Meaningful comments only.
No commented-out abandoned code.
No console errors.
71. CSS QUALITY

Avoid:

Excessive !important.
Inline styles everywhere.
Random magic numbers.
Duplicate CSS.
Conflicting media queries.

Use CSS variables where useful.

Example:

:root {
  --bg-primary: #050505;
  --bg-secondary: #111111;
  --text-primary: #ffffff;
  --text-secondary: #b3b3b3;
  --accent: #e50914;
}
72. BROWSER TESTING

After implementation, test:

Home
Popular
Now Playing
Top Rated
Upcoming
Search
Movie Details

Test:

Desktop
Tablet
Mobile
73. CONSOLE CHECK

Before considering the project complete:

Open browser DevTools.

Verify there are no:

React warnings.
Failed requests.
404 images.
Unhandled promise rejections.
Routing errors.
Duplicate unnecessary API requests.

Fix all issues found.

74. API FAILURE TEST

Test behavior when:

API key is invalid.
Internet is unavailable.
TMDB request fails.
Search has no results.
Movie ID is invalid.
Image is missing.

The application must remain usable.

75. MOBILE TEST

Specifically test:

375 × 812
390 × 844
414 × 896

Verify:

No horizontal page overflow.
Navbar works.
Search works.
Hero works.
Movie cards work.
Movie rows scroll.
Details page works.
Buttons are tappable.
76. DESKTOP TEST

Test:

1280 × 720
1440 × 900
1920 × 1080

Verify:

Hero does not look stretched.
Movie rows align correctly.
Navbar is clean.
Cards have consistent sizing.
Content does not become excessively wide.
77. FINAL UI CHECKLIST

Before completion verify:

Navbar
 Correct navigation
 Sticky behavior
 Scroll background
 Search
 Mobile menu
Hero
 Dynamic movie
 Backdrop
 Title
 Rating
 Metadata
 Overview
 Buttons
 Gradient
Movie Rows
 Trending
 Popular
 Now Playing
 Top Rated
 Upcoming
 Genres
 Horizontal scrolling
Movie Cards
 Poster
 Rating
 Release date
 Hover state
 Mobile click behavior
 Fallback image
Search
 Input
 Debounce
 API search
 Loading
 Results
 Empty state
 Error state
Details
 Backdrop
 Poster
 Title
 Rating
 Date
 Runtime
 Genres
 Overview
 Similar movies
Responsive
 Desktop
 Tablet
 Mobile
 No overflow
Technical
 TMDB API working
 Environment variable
 No exposed hardcoded API key
 No console errors
 No broken images
 No fake movie data
 No duplicate API requests
78. IMPORTANT DESIGN RULE

Do not stop once the API is connected.

The application must be visually polished.

If the first implementation looks like a basic React API project, continue improving:

spacing
typography
gradients
hero
cards
navigation
animations
responsive layouts
loading states
empty states

The final result should feel like a real streaming product.

79. IMPLEMENTATION ORDER

Follow this order:

Phase 1

Set up React/Vite project.

Phase 2

Configure environment variables.

Phase 3

Create TMDB API service.

Phase 4

Create reusable MovieCard.

Phase 5

Create MovieRow.

Phase 6

Create Navbar.

Phase 7

Create Hero.

Phase 8

Build Home page.

Phase 9

Build Search.

Phase 10

Build Movie Details.

Phase 11

Add genre sections.

Phase 12

Add loading states.

Phase 13

Add error states.

Phase 14

Add responsive design.

Phase 15

Add animations.

Phase 16

Optimize performance.

Phase 17

Test everything.

Phase 18

Fix all remaining UI/API issues.

80. FINAL INSTRUCTION TO CLAUDE

You are responsible for completing the entire Movie Explorer application.

Do not stop after generating a few components.

Do not provide only example code.

Actually implement the application in the repository.

After implementation:

Run the application.
Inspect it in the browser.
Check the console.
Fix errors.
Test TMDB requests.
Test navigation.
Test search.
Test movie details.
Test responsive layouts.
Refine the UI.

If something is visually weak, improve it.

If something is broken, fix it.

If an API response is missing data, handle it gracefully.

If a layout breaks on mobile, fix the responsive CSS.

The final application should be a complete, polished, responsive Movie Explorer powered by TMDB and visually inspired by premium streaming platforms.