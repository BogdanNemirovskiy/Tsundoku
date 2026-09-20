// TODO: define and export the `Anime` interface here yourself. Nothing else
// belongs in this file yet, and the app will not compile until you do.
//
// Shape it from a real Jikan response — look at the `data` array of:
//   https://api.jikan.moe/v4/anime?q=frieren&limit=5
//   https://api.jikan.moe/v4/anime/52991
//
// Fields the UI already reads (everything else on the response is optional
// as far as the components are concerned):
//
//   mal_id        number
//   title         string
//   title_english string | null      — DetailPage falls back to `title`
//   images        { jpg: { image_url: string; large_image_url: string } }
//   year          number | null      — cards render "—" when null
//   type          string | null      — "TV", "Movie", "OVA", ...
//   score         number | null
//   scored_by     number | null
//   rank          number | null
//   episodes      number | null
//   status        string | null
//   duration      string | null
//   synopsis      string | null
//   genres        { mal_id: number; name: string }[]
//   studios       { mal_id: number; name: string }[]
//
// Things worth deciding while you write it: which fields are genuinely
// nullable, whether `genres`/`studios` share one named interface, and whether
// the list and detail endpoints deserve one type or two.
