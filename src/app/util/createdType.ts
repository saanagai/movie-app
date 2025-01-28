export type createdType = {
  original_name: string;
  adult: boolean;
  gender: number;
  backdrop_path: string;
  popularity: number;
  id: number;
  known_for_department: string;
  genres: [];
};
// TMDB API-аас тухайн сонгосон киноны дараах мэдээллийг татаж харуулах:
// Нэр
// Тайлбар
// Хэрэглэгчийн үнэлгээ (дундаж үнэлгээ ба нийт саналын тоо)
// Нээлт хийсэн огноо
// Trailer (YouTube API эсвэл library ашиглан embed хийх)
// Жанр (Genres)
// Төстэй кинонууд (ижил төстэй жанр эсвэл шинж чанартай кинонууд).
