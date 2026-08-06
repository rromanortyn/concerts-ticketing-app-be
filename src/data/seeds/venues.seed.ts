const venuesSeed = [
  // Київ
  {
    citySlug: 'kyiv',
    name: 'Палац Україна',
  },
  {
    citySlug: 'kyiv',
    name: 'МЦКМ «Жовтневий палац»',
  },
  {
    citySlug: 'kyiv',
    name: 'Stereo Plaza',
  },
  {
    citySlug: 'kyiv',
    name: 'Atlas',
  },
  {
    citySlug: 'kyiv',
    name: 'Мала опера',
  },

  // Харків
  {
    citySlug: 'kharkiv',
    name: 'Театрально-концертний центр',
  },
  {
    citySlug: 'kharkiv',
    name: 'Харківська обласна філармонія',
  },
  {
    citySlug: 'kharkiv',
    name: 'ХНАТОБ',
  },
  {
    citySlug: 'kharkiv',
    name: 'Палац студентів НЮУ',
  },
  {
    citySlug: 'kharkiv',
    name: 'Art Area ДК',
  },

  // Одеса
  {
    citySlug: 'odesa',
    name: 'Одеська обласна філармонія',
  },
  {
    citySlug: 'odesa',
    name: 'Одеський театр музичної комедії',
  },
  {
    citySlug: 'odesa',
    name: 'Одеський оперний театр',
  },
  {
    citySlug: 'odesa',
    name: 'Concert Hall Odesa',
  },
  {
    citySlug: 'odesa',
    name: 'Зелений театр',
  },

  // Дніпро
  {
    citySlug: 'dnipro',
    name: 'Дніпровська філармонія',
  },
  {
    citySlug: 'dnipro',
    name: 'Дніпровський академічний театр опери та балету',
  },
  {
    citySlug: 'dnipro',
    name: 'ПК «Шинник»',
  },
  {
    citySlug: 'dnipro',
    name: 'Menorah Center',
  },
  {
    citySlug: 'dnipro',
    name: 'Bartolomeo',
  },

  // Львів
  {
    citySlug: 'lviv',
    name: 'Event Hall на !FESTrepublic',
  },
  {
    citySlug: 'lviv',
    name: 'Львівська національна опера',
  },
  {
    citySlug: 'lviv',
    name: 'Львівська національна філармонія',
  },
  {
    citySlug: 'lviv',
    name: 'Малевич Concert Arena',
  },
  {
    citySlug: 'lviv',
    name: 'Палац культури залізничників «Рокс»',
  },

  // Запоріжжя
  {
    citySlug: 'zaporizhzhia',
    name: 'Запорізька обласна філармонія',
  },
  {
    citySlug: 'zaporizhzhia',
    name: 'Палац культури «Дніпроспецсталь»',
  },
  {
    citySlug: 'zaporizhzhia',
    name: 'Запорізький академічний театр молоді',
  },
  {
    citySlug: 'zaporizhzhia',
    name: 'Запорізький академічний театр імені Магара',
  },

  // Кривий Ріг
  {
    citySlug: 'kryvyi-rih',
    name: 'Палац молоді і студентів',
  },
  {
    citySlug: 'kryvyi-rih',
    name: 'Театр імені Тараса Шевченка',
  },
  {
    citySlug: 'kryvyi-rih',
    name: 'ПК «Металург»',
  },
  {
    citySlug: 'kryvyi-rih',
    name: 'ПК «Північний»',
  },

  // Миколаїв
  {
    citySlug: 'mykolaiv',
    name: 'Миколаївський академічний художній драматичний театр',
  },
  {
    citySlug: 'mykolaiv',
    name: 'Миколаївська обласна філармонія',
  },
  {
    citySlug: 'mykolaiv',
    name: 'Обласний палац культури',
  },
  {
    citySlug: 'mykolaiv',
    name: 'Концерт-хол «Юність»',
  },

  // Вінниця
  {
    citySlug: 'vinnytsia',
    name: 'Вінницький театр імені Садовського',
  },
  {
    citySlug: 'vinnytsia',
    name: 'Вінницька обласна філармонія',
  },
  {
    citySlug: 'vinnytsia',
    name: 'Будинок офіцерів',
  },
  {
    citySlug: 'vinnytsia',
    name: 'PIROGOV SKY',
  },
  {
    citySlug: 'vinnytsia',
    name: 'Mont Blanc',
  },

  // Полтава
  {
    citySlug: 'poltava',
    name: 'Палац дозвілля «Листопад»',
  },
  {
    citySlug: 'poltava',
    name: 'Полтавська обласна філармонія',
  },
  {
    citySlug: 'poltava',
    name: 'Театр імені Миколи Гоголя',
  },
  {
    citySlug: 'poltava',
    name: 'Villa Крокодила',
  },

  // Чернігів
  {
    citySlug: 'chernihiv',
    name: 'Чернігівський обласний філармонійний центр',
  },
  {
    citySlug: 'chernihiv',
    name: 'Чернігівський драматичний театр імені Тараса Шевченка',
  },
  {
    citySlug: 'chernihiv',
    name: 'Міський палац культури',
  },
  {
    citySlug: 'chernihiv',
    name: 'Чернігівський молодіжний театр',
  },

  // Черкаси
  {
    citySlug: 'cherkasy',
    name: 'Палац культури «Дружба народів»',
  },
  {
    citySlug: 'cherkasy',
    name: 'Черкаська обласна філармонія',
  },
  {
    citySlug: 'cherkasy',
    name: 'Черкаський драматичний театр',
  },
  {
    citySlug: 'cherkasy',
    name: 'Manhattan',
  },

  // Житомир
  {
    citySlug: 'zhytomyr',
    name: 'Житомирський академічний музично-драматичний театр',
  },
  {
    citySlug: 'zhytomyr',
    name: 'Житомирська обласна філармонія',
  },
  {
    citySlug: 'zhytomyr',
    name: 'Жовтень',
  },
  {
    citySlug: 'zhytomyr',
    name: 'Дім української культури',
  },

  // Хмельницький
  {
    citySlug: 'khmelnytskyi',
    name: 'Хмельницька обласна філармонія',
  },
  {
    citySlug: 'khmelnytskyi',
    name: 'Хмельницький академічний театр імені Старицького',
  },
  {
    citySlug: 'khmelnytskyi',
    name: 'Хмельницький обласний театр ляльок',
  },
  {
    citySlug: 'khmelnytskyi',
    name: 'Молодіжний парк',
  },

  // Чернівці
  {
    citySlug: 'chernivtsi',
    name: 'Літній театр',
  },
  {
    citySlug: 'chernivtsi',
    name: 'Чернівецька обласна філармонія',
  },
  {
    citySlug: 'chernivtsi',
    name: 'Чернівецький театр імені Ольги Кобилянської',
  },
  {
    citySlug: 'chernivtsi',
    name: 'Центр культури «Вернісаж»',
  },

  // Рівне
  {
    citySlug: 'rivne',
    name: 'Міський будинок культури',
  },
  {
    citySlug: 'rivne',
    name: 'Рівненський обласний музично-драматичний театр',
  },
  {
    citySlug: 'rivne',
    name: 'Зала камерної та органної музики',
  },
  {
    citySlug: 'rivne',
    name: 'Палац дітей та молоді',
  },

  // Івано-Франківськ
  {
    citySlug: 'ivano-frankivsk',
    name: 'Драмтеатр імені Івана Франка',
  },
  {
    citySlug: 'ivano-frankivsk',
    name: 'Івано-Франківська обласна філармонія',
  },
  {
    citySlug: 'ivano-frankivsk',
    name: 'Concert Hall Platinum',
  },
  {
    citySlug: 'ivano-frankivsk',
    name: 'Палац Потоцьких',
  },

  // Тернопіль
  {
    citySlug: 'ternopil',
    name: 'Палац культури «Березіль»',
  },
  {
    citySlug: 'ternopil',
    name: 'Тернопільський драматичний театр',
  },
  {
    citySlug: 'ternopil',
    name: 'Тернопільська обласна філармонія',
  },
  {
    citySlug: 'ternopil',
    name: 'Na Пошті',
  },

  // Луцьк
  {
    citySlug: 'lutsk',
    name: 'Розважальний центр «Промінь»',
  },
  {
    citySlug: 'lutsk',
    name: 'Волинський драматичний театр',
  },
  {
    citySlug: 'lutsk',
    name: 'Палац культури міста Луцька',
  },
  {
    citySlug: 'lutsk',
    name: 'Культурне укриття',
  },

  // Ужгород
  {
    citySlug: 'uzhhorod',
    name: 'Закарпатський драматичний театр',
  },
  {
    citySlug: 'uzhhorod',
    name: 'Закарпатська обласна філармонія',
  },
  {
    citySlug: 'uzhhorod',
    name: 'ПАДІЮН',
  },
  {
    citySlug: 'uzhhorod',
    name: 'Амфітеатр',
  },

  // Кропивницький
  {
    citySlug: 'kropyvnytskyi',
    name: 'Кіровоградська обласна філармонія',
  },
  {
    citySlug: 'kropyvnytskyi',
    name: 'Театр імені Марка Кропивницького',
  },
  {
    citySlug: 'kropyvnytskyi',
    name: 'Палац культури «Світлопільський»',
  },
  {
    citySlug: 'kropyvnytskyi',
    name: 'Дендропарк',
  },

  // Кременчук
  {
    citySlug: 'kremenchuk',
    name: 'Міський палац культури',
  },
  {
    citySlug: 'kremenchuk',
    name: 'ПК «Нафтохімік»',
  },
  {
    citySlug: 'kremenchuk',
    name: 'Кременчуцький театр комедії «Мо»',
  },
  {
    citySlug: 'kremenchuk',
    name: 'Артпростір «Культурний діалог»',
  },

  // Біла Церква
  {
    citySlug: 'bila-tserkva',
    name: 'ПК «Росава»',
  },
  {
    citySlug: 'bila-tserkva',
    name: 'Театр імені Панаса Саксаганського',
  },
  {
    citySlug: 'bila-tserkva',
    name: 'Будинок органної та камерної музики',
  },
  {
    citySlug: 'bila-tserkva',
    name: 'Білоцерківський краєзнавчий музей',
  },

  // Кам'янське
  {
    citySlug: 'kamianske',
    name: 'Академічний музично-драматичний театр імені Лесі Українки',
  },
  {
    citySlug: 'kamianske',
    name: 'Кіноконцертний зал «Мир»',
  },
  {
    citySlug: 'kamianske',
    name: 'Палац культури «Хімік»',
  },
  {
    citySlug: 'kamianske',
    name: 'Центральний парк культури та відпочинку',
  },

  // Умань
  {
    citySlug: 'uman',
    name: 'Уманський міський будинок культури',
  },
  {
    citySlug: 'uman',
    name: 'Уманський драматичний театр',
  },
  {
    citySlug: 'uman',
    name: 'Національний дендрологічний парк «Софіївка»',
  },
  {
    citySlug: 'uman',
    name: 'Шевченко HUB',
  },

  // Бровари
  {
    citySlug: 'brovary',
    name: 'Міський культурний центр «Прометей»',
  },
  {
    citySlug: 'brovary',
    name: 'Термінал',
  },
  {
    citySlug: 'brovary',
    name: 'Концерт-хол «Термінал»',
  },
  {
    citySlug: 'brovary',
    name: 'Броварська міська бібліотека',
  },

  // Мукачево
  {
    citySlug: 'mukachevo',
    name: 'Мукачівський драматичний театр',
  },
  {
    citySlug: 'mukachevo',
    name: 'Палац культури і мистецтв',
  },
  {
    citySlug: 'mukachevo',
    name: 'Замок Паланок',
  },
  {
    citySlug: 'mukachevo',
    name: 'Eventum Hall',
  },

  // Дрогобич
  {
    citySlug: 'drohobych',
    name: 'Народний дім імені Івана Франка',
  },
  {
    citySlug: 'drohobych',
    name: 'Львівський обласний музично-драматичний театр імені Юрія Дрогобича',
  },
  {
    citySlug: 'drohobych',
    name: 'Палац мистецтв',
  },
  {
    citySlug: 'drohobych',
    name: 'Дрогобицька хоральна синагога',
  },
]

export default venuesSeed
