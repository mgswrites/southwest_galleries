// Backlog of candidate topics for the weekly guide published to `posts`.
// Each entry is consumed once — whatever generates the next guide should
// pick the first one whose slug isn't already in `posts`, publish it, and
// move to the next entry the following week. Top this list back up
// periodically with new candidates once it runs low.

export interface GuideTopic {
  slug: string;
  workingTitle: string;
  brief: string;
  stateCode?: string;
  cityId?: number;
  heroImage: string;
}

export const GUIDE_TOPICS: GuideTopic[] = [
  {
    slug: 'telluride-art-galleries-guide',
    workingTitle: 'Telluride Art Scene: Galleries Among the San Juan Peaks',
    brief: 'A city guide to the gallery scene in Telluride, Colorado — its historic downtown gallery district, the influence of the summer festival season and the Telluride Arts organization, and what makes the town distinct from Aspen and other Colorado mountain art markets.',
    stateCode: 'CO',
    cityId: 35,
    heroImage: '/states/colorado.jpg',
  },
  {
    slug: 'boulder-art-galleries-guide',
    workingTitle: 'Boulder Art Galleries: Pearl Street to the University Hill Arts District',
    brief: 'A city guide to the gallery and public-art scene in Boulder, Colorado — the Pearl Street pedestrian mall, the monthly Boulder Open Studios tradition, and the university\'s influence on the local contemporary art community.',
    stateCode: 'CO',
    cityId: 11,
    heroImage: '/states/colorado.jpg',
  },
  {
    slug: 'colorado-springs-art-galleries-guide',
    workingTitle: 'Colorado Springs Art Scene: From the Fine Arts Center to Manitou Springs',
    brief: 'A city guide to Colorado Springs and neighboring Manitou Springs — the Colorado Springs Fine Arts Center at Colorado College, the monthly downtown gallery walk, and the small-town arts colony character of Manitou Springs.',
    stateCode: 'CO',
    cityId: 33,
    heroImage: '/states/colorado.jpg',
  },
  {
    slug: 'san-diego-art-galleries-guide',
    workingTitle: 'San Diego Art Galleries: Little Italy to Barrio Logan',
    brief: 'A city guide to San Diego\'s gallery scene — the Little Italy arts district and its ArtWalk tradition, Barrio Logan\'s Chicano Park and its muralist community, and the museums of Balboa Park.',
    stateCode: 'CA',
    cityId: 20,
    heroImage: '/states/california.jpg',
  },
  {
    slug: 'laguna-beach-art-galleries-guide',
    workingTitle: 'Laguna Beach Art Scene: A Century of California Plein Air Painting',
    brief: 'A city guide to Laguna Beach, California — its roots as an early-20th-century plein air painting colony, the summer Festival of Arts and Sawdust Art Festival, and the year-round gallery district along Pacific Coast Highway.',
    stateCode: 'CA',
    cityId: 24,
    heroImage: '/states/california.jpg',
  },
  {
    slug: 'santa-barbara-art-galleries-guide',
    workingTitle: 'Santa Barbara Art Galleries: Spanish Colonial Style Meets the Contemporary Coast',
    brief: 'A city guide to Santa Barbara, California — the Santa Barbara Museum of Art, the long-running Sunday Arts & Crafts Show on the waterfront, and the city\'s distinctive Spanish Colonial Revival architecture as a backdrop to its gallery district.',
    stateCode: 'CA',
    cityId: 23,
    heroImage: '/states/california.jpg',
  },
  {
    slug: 'carmel-art-galleries-guide',
    workingTitle: 'Carmel-by-the-Sea Art Galleries: A Century-Old Art Colony',
    brief: 'A city guide to Carmel-by-the-Sea, California — one of the oldest art colonies on the West Coast, its dense concentration of galleries within a walkable village, and the annual Carmel Art Festival.',
    stateCode: 'CA',
    cityId: 22,
    heroImage: '/states/california.jpg',
  },
  {
    slug: 'houston-art-galleries-guide',
    workingTitle: 'Houston Art Scene: From the Menil Collection to the Museum District',
    brief: 'A city guide to Houston, Texas — the Menil Collection and Rothko Chapel, the Museum District, and the city\'s commercial gallery scene, including the long-running Bayou City Art Festival.',
    stateCode: 'TX',
    cityId: 49,
    heroImage: '/states/texas.jpg',
  },
  {
    slug: 'fort-worth-art-galleries-guide',
    workingTitle: 'Fort Worth Art Scene: The Cultural District\'s World-Class Museums',
    brief: 'A city guide to Fort Worth, Texas — the Cultural District anchored by the Kimbell Art Museum, the Modern Art Museum of Fort Worth, and the Amon Carter Museum of American Art, plus the city\'s commercial galleries and Gallery Night tradition.',
    stateCode: 'TX',
    cityId: 51,
    heroImage: '/states/texas.jpg',
  },
  {
    slug: 'san-antonio-art-galleries-guide',
    workingTitle: 'San Antonio Art Scene: The Blue Star Arts Complex and Beyond',
    brief: 'A city guide to San Antonio, Texas — the Blue Star Arts Complex and its monthly First Friday, the McNay Art Museum, and the city\'s bicultural contemporary art scene.',
    stateCode: 'TX',
    cityId: 53,
    heroImage: '/states/texas.jpg',
  },
  {
    slug: 'el-paso-art-galleries-guide',
    workingTitle: 'El Paso Art Scene: Border City Murals and the El Paso Museum of Art',
    brief: 'A city guide to El Paso, Texas — the El Paso Museum of Art, the city\'s significant mural and street art tradition shaped by its position on the US-Mexico border, and its emerging commercial gallery scene.',
    stateCode: 'TX',
    cityId: 54,
    heroImage: '/states/texas.jpg',
  },
  {
    slug: 'reno-art-galleries-guide',
    workingTitle: 'Reno Art Scene: The Nevada Museum of Art and the Riverwalk District',
    brief: 'A city guide to Reno, Nevada — the Nevada Museum of Art, the Riverwalk Arts District and its monthly First Friday, and Reno\'s connection to Burning Man\'s art-making culture.',
    stateCode: 'NV',
    cityId: 40,
    heroImage: '/states/nevada.jpg',
  },
  {
    slug: 'prescott-art-galleries-guide',
    workingTitle: 'Prescott Art Galleries: Arizona\'s Territorial-Era Art Town',
    brief: 'A city guide to Prescott, Arizona — its historic courthouse square, the Mountain Artists Guild, and its character as a smaller, less-touristed alternative to Sedona and Scottsdale for gallery-going.',
    stateCode: 'AZ',
    cityId: 28,
    heroImage: '/states/arizona.jpg',
  },
  {
    slug: 'southwest-art-fairs-festivals-guide',
    workingTitle: 'The Southwest\'s Best Art Fairs and Festivals: A Year-Round Planning Guide',
    brief: 'A thematic roundup guide covering how to plan a trip around the region\'s major art fairs and festivals across the calendar year — referencing the range of events already documented on the site (First Fridays, Indian Market, Sedona festivals, Laguna Beach summer festivals, etc.) without inventing new event specifics. Should naturally point readers to the site\'s /events/ section.',
    heroImage: '/hero.jpg',
  },
  {
    slug: 'contemporary-indigenous-ceramics-guide',
    workingTitle: 'Contemporary Indigenous Ceramics: Tradition and Innovation in Southwest Pottery',
    brief: 'A thematic guide to contemporary Native American and Indigenous ceramic art in the Southwest — the continuity from historic Pueblo pottery traditions to today\'s working potters, and what collectors should understand about provenance and authenticity when buying.',
    heroImage: '/hero.jpg',
  },
  {
    slug: 'southwest-sculpture-parks-outdoor-art-guide',
    workingTitle: 'Southwest Sculpture Parks and Outdoor Art Installations',
    brief: 'A thematic guide to notable outdoor sculpture parks and large-scale public art installations across the Southwest — from land art in remote desert settings to sculpture gardens attached to museums.',
    heroImage: '/hero.jpg',
  },
  {
    slug: 'how-galleries-price-art-buyers-guide',
    workingTitle: 'How Galleries Price Art: A Buyer\'s Guide to the Southwest Market',
    brief: 'A practical thematic guide explaining how commercial galleries price original art, what factors (medium, size, artist reputation, gallery commission) drive cost, and how first-time buyers should think about value when shopping Southwest galleries.',
    heroImage: '/hero.jpg',
  },
  {
    slug: 'glass-art-southwest-studios-guide',
    workingTitle: 'Glass Art in the Southwest: Studios, Galleries, and Live Glassblowing',
    brief: 'A thematic guide to the studio glass movement in the Southwest — where visitors can see live glassblowing demonstrations, buy contemporary glass art, and how the medium fits into the region\'s broader craft tradition.',
    heroImage: '/hero.jpg',
  },
  {
    slug: 'santa-fe-style-history-guide',
    workingTitle: 'The History of Santa Fe Style: How an Art Colony Shaped American Taste',
    brief: 'A thematic/historical guide to the origins of "Santa Fe Style" in art and architecture — the early-20th-century arrival of artists in Santa Fe and Taos, the role of institutions like the Museum of New Mexico, and how the aesthetic spread nationally.',
    stateCode: 'NM',
    heroImage: '/states/new-mexico.jpg',
  },
  {
    slug: 'buying-art-at-auction-southwest-guide',
    workingTitle: 'A Beginner\'s Guide to Buying Southwest Art at Auction',
    brief: 'A practical thematic guide explaining how art auctions work for readers new to the process — the difference between buying at a gallery versus at auction, how to research a lot, buyer\'s premiums, and how this applies to the Western and Native American art auction market specifically.',
    heroImage: '/hero.jpg',
  },
];
