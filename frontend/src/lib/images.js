// High-quality hotel images from Unsplash (free, no attribution required for display)
export const HOTEL_IMAGES = {
  // Hero / exterior
  hero: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&q=85&auto=format&fit=crop',
  heroAlt: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=85&auto=format&fit=crop',
  exterior: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80&auto=format&fit=crop',
  lobby: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80&auto=format&fit=crop',
  pool: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80&auto=format&fit=crop',
  garden: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1200&q=80&auto=format&fit=crop',

  // Rooms
  standardRoom: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80&auto=format&fit=crop',
  standardRoom2: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80&auto=format&fit=crop',
  deluxeRoom: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80&auto=format&fit=crop',
  deluxeRoom2: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80&auto=format&fit=crop',
  juniorSuite: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80&auto=format&fit=crop',
  juniorSuite2: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80&auto=format&fit=crop',
  bambooSuite: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80&auto=format&fit=crop',
  bambooSuite2: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=800&q=80&auto=format&fit=crop',
  familyRoom: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80&auto=format&fit=crop',

  // Amenities
  restaurant: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80&auto=format&fit=crop',
  spa: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80&auto=format&fit=crop',
  gym: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80&auto=format&fit=crop',
  bar: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80&auto=format&fit=crop',
  breakfast: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&q=80&auto=format&fit=crop',
  poolside: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80&auto=format&fit=crop',
};

// Map room category names to images
export const ROOM_CATEGORY_IMAGES = {
  'Standard Room': [HOTEL_IMAGES.standardRoom, HOTEL_IMAGES.standardRoom2],
  'Deluxe Room': [HOTEL_IMAGES.deluxeRoom, HOTEL_IMAGES.deluxeRoom2],
  'Junior Suite': [HOTEL_IMAGES.juniorSuite, HOTEL_IMAGES.juniorSuite2],
  'Bamboo Suite': [HOTEL_IMAGES.bambooSuite, HOTEL_IMAGES.bambooSuite2],
  'Family Room': [HOTEL_IMAGES.familyRoom, HOTEL_IMAGES.standardRoom2],
};

export const getRoomImage = (categoryName, index = 0) => {
  const imgs = ROOM_CATEGORY_IMAGES[categoryName];
  if (imgs) return imgs[index % imgs.length];
  return HOTEL_IMAGES.standardRoom;
};
