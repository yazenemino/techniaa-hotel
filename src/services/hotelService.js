/**
 * hotelService.js — Mock API service for hotels & rooms
 * Simulates backend responses with realistic Turkish hotel data
 */

const MOCK_HOTELS = [
  {
    id: 1,
    name: 'The Grand Bosphorus Palace',
    location: 'İstanbul, Beşiktaş',
    description: 'İstanbul Boğazı\'nın eşsiz manzarasına sahip, tarihi yarımadanın kalbinde yer alan lüks bir otel. Osmanlı mimarisi ile modern konforu bir arada sunan The Grand Bosphorus Palace, unutulmaz bir konaklama deneyimi vaat ediyor.',
    rating: 4.8,
    reviewCount: 342,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    amenities: ['Spa', 'Havuz', 'WiFi', 'Restoran', 'Otopark'],
    rooms: [
      { id: 101, name: 'Standart Oda', personCount: 2, pricePerNight: 1200, features: ['Şehir Manzarası', 'Klima', 'Mini Bar'], image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80' },
      { id: 102, name: 'Deluxe Suite', personCount: 3, pricePerNight: 2400, features: ['Boğaz Manzarası', 'Jakuzi', 'Balkon'], image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80' },
      { id: 103, name: 'Aile Odası', personCount: 4, pricePerNight: 3200, features: ['2 Yatak Odası', 'Oturma Alanı', 'Mutfak'], image: 'https://images.unsplash.com/photo-1590490360182-c33d955f4c47?w=600&q=80' },
      { id: 104, name: 'Ekonomik Oda', personCount: 1, pricePerNight: 750, features: ['Kompakt', 'Duş', 'WiFi'], image: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=600&q=80' },
      { id: 105, name: 'Penthouse Suite', personCount: 2, pricePerNight: null, features: ['Teras', '360° Manzara', 'Özel Asansör'], image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80' },
    ],
  },
  {
    id: 2,
    name: 'Cappadocia Cave Resort',
    location: 'Nevşehir, Göreme',
    description: 'Kapadokya\'nın büyülü peri bacaları arasında, doğal kaya oyma odalarda eşsiz bir konaklama. Balon turu ile uyanan sabahlar ve yıldızların altında akşam yemekleri.',
    rating: 4.9,
    reviewCount: 567,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
    amenities: ['Teras', 'Restoran', 'WiFi', 'Tur', 'Hamam'],
    rooms: [
      { id: 201, name: 'Cave Standard', personCount: 2, pricePerNight: 1800, features: ['Taş Duvar', 'Otantik Dekor', 'Teras'], image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=600&q=80' },
      { id: 202, name: 'Cave Deluxe', personCount: 2, pricePerNight: 2800, features: ['Vadi Manzarası', 'Jakuzi', 'Şömine'], image: 'https://images.unsplash.com/photo-1590490360182-c33d955f4c47?w=600&q=80' },
      { id: 203, name: 'Royal Cave Suite', personCount: 3, pricePerNight: 4500, features: ['Özel Havuz', 'Hamam', 'Butler'], image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80' },
    ],
  },
  {
    id: 3,
    name: 'Aegean Breeze Hotel',
    location: 'İzmir, Çeşme',
    description: 'Ege\'nin masmavi sularına bakan, Çeşme sahilinde yer alan butik bir otel. Taze deniz ürünleri, özel plaj ve rüzgar sörfü ile tatil keyfinizi tamamlayın.',
    rating: 4.6,
    reviewCount: 189,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
    amenities: ['Plaj', 'Havuz', 'WiFi', 'SPA', 'Bar'],
    rooms: [
      { id: 301, name: 'Deniz Manzaralı Oda', personCount: 2, pricePerNight: 1500, features: ['Balkon', 'Deniz Manzarası', 'Klima'], image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80' },
      { id: 302, name: 'Garden Suite', personCount: 3, price: 2100, features: ['Bahçe', 'Veranda', 'Jakuzi'], image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80' },
      { id: 303, name: 'Beach Bungalow', personCount: 2, pricePerNight: 3500, features: ['Özel Plaj', 'Açık Duş', 'Hamak'], image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=600&q=80' },
      { id: 304, name: 'Ekonomik Oda', personCount: 1, pricePerNight: null, features: ['Kompakt', 'WiFi'], image: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=600&q=80' },
    ],
  },
  {
    id: 4,
    name: 'Antalya Lara Premium',
    location: 'Antalya, Lara',
    description: 'Akdeniz kıyısında ultra her şey dahil konseptiyle hizmet veren premium resort. Aquapark, 7 restoran ve gece eğlenceleri ile mükemmel bir tatil.',
    rating: 4.5,
    reviewCount: 821,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
    amenities: ['Her Şey Dahil', 'Aquapark', 'Spa', 'Plaj', 'Animasyon'],
    rooms: [
      { id: 401, name: 'Standart Oda', personCount: 2, pricePerNight: 900, features: ['Havuz Manzarası', 'Klima', 'TV'], image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80' },
      { id: 402, name: 'Aile Odası', personCount: 4, pricePerNight: 1600, features: ['Bağlantılı Oda', 'Çocuk Alanı', 'Mini Bar'], image: 'https://images.unsplash.com/photo-1590490360182-c33d955f4c47?w=600&q=80' },
      { id: 403, name: 'King Suite', personCount: 2, pricePerNight: 2800, features: ['Deniz Manzarası', 'Özel Havuz', 'Butler'], image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80' },
    ],
  },
  {
    id: 5,
    name: 'Pamukkale Thermal Spa',
    location: 'Denizli, Pamukkale',
    description: 'UNESCO Dünya Mirası listesindeki travertenlere komşu termal otel. Doğal termal sularla tedavi amaçlı konaklama ve antik kent turları.',
    rating: 4.3,
    reviewCount: 145,
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80',
    amenities: ['Termal', 'Spa', 'Restoran', 'Tur', 'WiFi'],
    rooms: [
      { id: 501, name: 'Termal Oda', personCount: 2, pricePerNight: 800, features: ['Termal Banyo', 'Bahçe Manzarası'], image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80' },
      { id: 502, name: 'VIP Suite', personCount: 2, pricePerNight: 1400, features: ['Özel Termal Havuz', 'Masaj'], image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80' },
    ],
  },
  {
    id: 6,
    name: 'Trabzon Uzungöl Lodge',
    location: 'Trabzon, Uzungöl',
    description: 'Karadeniz\'in yeşil doğası içinde, Uzungöl manzaralı dağ evi tarzı otel. Doğa yürüyüşleri, yöresel lezzetler ve huzurlu bir kaçamak.',
    rating: 4.7,
    reviewCount: 234,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',
    amenities: ['Doğa', 'Restoran', 'WiFi', 'Şömine', 'Trekking'],
    rooms: [
      { id: 601, name: 'Göl Manzaralı Oda', personCount: 2, pricePerNight: 650, features: ['Göl Manzarası', 'Balkon', 'Şömine'], image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=600&q=80' },
      { id: 602, name: 'Dağ Evi Suite', personCount: 4, pricePerNight: 1200, features: ['2 Kat', 'Mutfak', 'Teras'], image: 'https://images.unsplash.com/photo-1590490360182-c33d955f4c47?w=600&q=80' },
      { id: 603, name: 'Ekonomik Oda', personCount: 1, pricePerNight: 400, features: ['Kompakt', 'Sıcak Su', 'WiFi'], image: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=600&q=80' },
    ],
  },
];

const MOCK_COMMENTS = [
  { id: 1, hotelId: 1, author: 'Ayşe K.', date: '2026-03-15', rating: 5, text: 'Mükemmel bir deneyimdi! Boğaz manzarası nefes kesiciydi. Personel çok ilgili ve yardımseverdi.', image: null },
  { id: 2, hotelId: 1, author: 'Mehmet S.', date: '2026-03-10', rating: 4, text: 'Genel olarak güzel bir otel. Kahvaltı çeşitleri zengin. Tek sıkıntı otopark biraz küçük.', image: null },
  { id: 3, hotelId: 2, author: 'Zeynep A.', date: '2026-04-01', rating: 5, text: 'Kapadokya\'da en iyi otel! Balon turu organizasyonu harikaydı. Kesinlikle tekrar geleceğiz.', image: null },
  { id: 4, hotelId: 2, author: 'Ali R.', date: '2026-03-28', rating: 5, text: 'Cave odasında kalmak bambaşka bir deneyim. Romantik bir tatil için ideal.', image: null },
  { id: 5, hotelId: 3, author: 'Fatma D.', date: '2026-02-20', rating: 4, text: 'Deniz harika, plaj temiz. Yemekler lezzetli ama menü biraz kısıtlı.', image: null },
];

// Simulate network delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetch all hotels
 */
export async function fetchHotels() {
  await delay(600);
  return MOCK_HOTELS.map(({ rooms, ...hotel }) => hotel);
}

/**
 * Fetch a single hotel by ID
 */
export async function fetchHotelById(id) {
  await delay(400);
  const hotel = MOCK_HOTELS.find((h) => h.id === Number(id));
  if (!hotel) throw new Error('Otel bulunamadı');
  return hotel;
}

/**
 * Fetch rooms for a hotel, optionally filtered by person count
 * Matches: /api/rooms?hotelId=X&count=Y
 */
export async function fetchRooms(hotelId, personCount) {
  await delay(500);
  const hotel = MOCK_HOTELS.find((h) => h.id === Number(hotelId));
  if (!hotel) throw new Error('Otel bulunamadı');

  let rooms = hotel.rooms;
  if (personCount && Number(personCount) > 0) {
    rooms = rooms.filter((r) => r.personCount >= Number(personCount));
  }
  return rooms;
}

/**
 * Fetch comments for a hotel
 */
export async function fetchComments(hotelId) {
  await delay(300);
  return MOCK_COMMENTS.filter((c) => c.hotelId === Number(hotelId));
}

/**
 * Post a new comment
 */
export async function postComment(hotelId, commentData) {
  await delay(500);
  const newComment = {
    id: Date.now(),
    hotelId: Number(hotelId),
    author: commentData.author || 'Misafir',
    date: new Date().toISOString().split('T')[0],
    rating: commentData.rating || 5,
    text: commentData.text,
    image: commentData.image || null,
  };
  MOCK_COMMENTS.push(newComment);
  return newComment;
}

/**
 * Submit a reservation
 */
export async function submitReservation(reservationData) {
  await delay(1000);
  return {
    id: Date.now(),
    ...reservationData,
    status: 'Pending',
    createdAt: new Date().toISOString(),
  };
}
