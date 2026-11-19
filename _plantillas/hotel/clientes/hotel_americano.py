# Config del Hotel Americano (Jaén). Solo datos: el diseño vive en plantilla.html.
# "pub": True = tarifa publicada por el hotel. "real": True = dato que el hotel publica (Booking / su web / su Instagram).
CFG = {
  "banner": "Boceto de propuesta preparado por <b>Kevin Huamán</b> para el Hotel Americano · Las <b>tarifas, tipos de habitación, carta, paquetes y horarios de servicios</b> son de ejemplo, la ilustración es referencial y los colores son de prueba hasta ver su logo",
  "nombre": "Hotel Americano", "ciudad": "Jaén", "region": "Cajamarca", "inicial": "A", "logo": None, "fotoHero": None,
  "direccion": "Universidad 120, Jaén, Cajamarca",
  "wa": "51937480022", "telefonoTxt": "937 480 022", "fijo": "(076) 786-030", "instagram": "hotelamericano2020",
  "mapsQ": "Hotel Americano Universidad 120 Jaén Cajamarca",
  "google": {"nota": "4,4", "n": 168},
  "checkin": "09:00", "checkout": "14:00",
  "vista1": "Crema y cobre", "vista2": "Medianoche",
  "titular1": "Descanse en Jaén y <em>reserve directo</em> con el hotel",
  "lead1": "Habitaciones con baño privado, TV cable, ambiente climatizado, Wi-Fi y cochera. Elija sus fechas, vea el total estimado y pida su reserva por WhatsApp en un minuto.",
  "titular2": "¿Qué lo trae a Jaén? <em>Armamos su estadía</em>",
  "lead2": "Elija el motivo de su viaje y el hotel le muestra la habitación que conviene, qué servicios usará y a qué hora. Después pida la reserva por WhatsApp.",
  "restaurante": "American Café · Resto bar",
  "comoLlegar": "Universidad 120, en Jaén. El hotel ofrece traslado desde el aeropuerto (a coordinar).",
  "stats": [["24 h", "Recepción"], ["37", "Habitaciones (según Booking)"], ["4,4 ★", "En Google Maps"], ["Cochera", "Para su vehículo"]],
  "notaTarifas": "Solo la <b>matrimonial a S/ 110</b> aparece hoy en la web del hotel; los demás tipos y tarifas son de ejemplo. El hotel confirma la disponibilidad y el precio final.",
  "habitacionBase": "matri",
  "habitaciones": [
    {"id": "simple", "n": "Simple", "cap": 1, "p": 80, "pub": False, "ic": "bed", "camas": "1 cama de 1,5 plazas", "hidro": False,
     "d": "Para una persona: baño privado, TV cable y Wi-Fi.",
     "inc": ["Baño privado", "TV cable", "Wi-Fi", "Ambiente climatizado", "Recepción 24 h", "Servicio a la habitación"]},
    {"id": "matri", "n": "Matrimonial", "cap": 2, "p": 110, "pub": True, "ic": "bed2", "camas": "1 cama de 2 plazas", "hidro": False,
     "d": "Cama de dos plazas, baño privado, TV cable y ambiente climatizado.",
     "inc": ["Baño privado", "TV cable", "Wi-Fi", "Ambiente climatizado", "Recepción 24 h", "Servicio a la habitación"]},
    {"id": "doble", "n": "Doble", "cap": 2, "p": 130, "pub": False, "ic": "twin", "camas": "2 camas de 1,5 plazas", "hidro": False,
     "d": "Dos camas, ideal para colegas o amigos de viaje.",
     "inc": ["Baño privado", "TV cable", "Wi-Fi", "Ambiente climatizado", "Recepción 24 h", "Servicio a la habitación"]},
    {"id": "triple", "n": "Triple", "cap": 3, "p": 170, "pub": False, "ic": "triple", "camas": "3 camas de 1,5 plazas", "hidro": False,
     "d": "Para tres personas, con baño privado y TV cable.",
     "inc": ["Baño privado", "TV cable", "Wi-Fi", "Ambiente climatizado", "Cochera disponible", "Servicio a la habitación"]},
    {"id": "hidro", "n": "Matrimonial con hidromasaje", "cap": 2, "p": 160, "pub": False, "ic": "tub", "camas": "1 cama de 2 plazas", "hidro": True,
     "d": "Con bañera de hidromasaje (solo algunas habitaciones del hotel).",
     "inc": ["Bañera de hidromasaje", "Baño privado", "TV cable", "Wi-Fi", "Ambiente climatizado", "Servicio a la habitación"]}
  ],
  "servicios": [
    {"ic": "clock", "t": "Recepción 24 horas", "d": "Atención a cualquier hora, también para llegadas de madrugada.", "real": True},
    {"ic": "plane", "t": "Traslado del aeropuerto", "d": "Recojo desde el aeropuerto de Jaén, a coordinar con el hotel.", "real": True},
    {"ic": "car", "t": "Cochera", "d": "Espacio para su vehículo durante la estadía.", "real": True},
    {"ic": "cup", "t": "American Café", "d": "Restaurante y cafetería del hotel, para desayuno, almuerzo y cena.", "real": True},
    {"ic": "glass", "t": "Resto bar", "d": "Bar dentro del hotel para cerrar el día sin salir.", "real": True},
    {"ic": "bell", "t": "Servicio a la habitación", "d": "Pida su comida o bebida sin bajar de su cuarto.", "real": True},
    {"ic": "wifi", "t": "Wi-Fi", "d": "Conexión en las habitaciones y áreas comunes.", "real": True},
    {"ic": "air", "t": "Ambiente climatizado", "d": "Habitaciones climatizadas para el calor de Jaén.", "real": True},
    {"ic": "tv", "t": "TV cable", "d": "Televisión por cable en cada habitación.", "real": True},
    {"ic": "tub", "t": "Hidromasaje", "d": "Bañera de hidromasaje en algunas habitaciones.", "real": True},
    {"ic": "pool", "t": "Piscina de temporada", "d": "Referencias de piscina en temporada de calor; se confirma con el hotel.", "real": False},
    {"ic": "brief", "t": "Tarifas para empresas", "d": "Convenios para quienes viajan seguido por trabajo.", "real": False}
  ],
  "galeria": [
    {"c": "Exterior", "t": "Fachada del hotel", "ic": "key"},
    {"c": "Habitaciones", "t": "Habitación matrimonial", "ic": "bed2"},
    {"c": "Habitaciones", "t": "Habitación con hidromasaje", "ic": "tub"},
    {"c": "Habitaciones", "t": "Habitación doble", "ic": "twin"},
    {"c": "American Café", "t": "Salón del American Café", "ic": "cup"},
    {"c": "American Café", "t": "Desayuno", "ic": "cup"},
    {"c": "Resto bar", "t": "Barra del resto bar", "ic": "glass"},
    {"c": "Piscina", "t": "Piscina (temporada)", "ic": "pool"}
  ],
  "carta": [
    {"n": "Desayunos", "items": [
      {"id": "d1", "n": "Desayuno americano", "d": "Huevos, pan, jugo y café", "p": 14},
      {"id": "d2", "n": "Pan con tortilla y café", "d": "Clásico de la mañana", "p": 10},
      {"id": "d3", "n": "Jugo de frutas", "d": "Papaya, naranja o piña", "p": 7}
    ]},
    {"n": "Cafetería", "items": [
      {"id": "c1", "n": "Café americano", "d": "Grande, de grano de la zona", "p": 6},
      {"id": "c2", "n": "Cappuccino", "d": "Espresso con leche espumada", "p": 8},
      {"id": "c3", "n": "Sándwich de pollo", "d": "Pan artesanal, pollo y verduras", "p": 12}
    ]},
    {"n": "Almuerzo y cena", "items": [
      {"id": "a1", "n": "Lomo saltado", "d": "Con arroz y papas fritas", "p": 28},
      {"id": "a2", "n": "Arroz con pollo", "d": "Con ensalada criolla", "p": 22},
      {"id": "a3", "n": "Menú ejecutivo", "d": "Entrada, segundo y refresco", "p": 18}
    ]},
    {"n": "Resto bar", "items": [
      {"id": "b1", "n": "Pisco sour", "d": "Clásico peruano", "p": 18},
      {"id": "b2", "n": "Chilcano", "d": "Pisco, ginger ale y limón", "p": 16},
      {"id": "b3", "n": "Cerveza", "d": "Helada, 330 ml", "p": 9}
    ]}
  ],
  "paquetes": [
    {"ic": "heart", "t": "Escapada de pareja", "d": "Para desconectar un fin de semana.", "p": 190, "inc": ["Matrimonial con hidromasaje", "Desayuno para dos", "Un cóctel en el resto bar"]},
    {"ic": "brief", "t": "Viaje de trabajo", "d": "Para quienes vienen por varios días.", "p": 120, "inc": ["Habitación simple o matrimonial", "Desayuno", "Recojo del aeropuerto"]},
    {"ic": "fam", "t": "En familia", "d": "Todos juntos y sin apuros.", "p": 200, "inc": ["Habitación triple", "Desayuno para tres", "Piscina en temporada"]}
  ],
  "faq": [
    ["¿A qué hora puedo llegar?", "La recepción atiende las 24 horas. Si su vuelo o bus llega temprano o de madrugada, indíquelo en la reserva y el hotel le confirma cómo recibirlo."],
    ["¿El hotel recoge del aeropuerto?", "Su ficha indica traslado desde el aeropuerto. Marque la casilla al reservar y el hotel confirma la hora y el costo."],
    ["¿Tienen cochera?", "Sí, el hotel cuenta con cochera. Avise al reservar para que le guarden el espacio."],
    ["¿Hay piscina?", "Hay referencias de piscina de temporada. Se confirma con el hotel en qué meses está disponible."],
    ["¿El desayuno está incluido?", "Depende de la tarifa. Pregunte al reservar y el hotel le indica si el desayuno va incluido o se pide aparte en el American Café."],
    ["¿Puedo pedir comida a la habitación?", "Sí, el hotel ofrece servicio a la habitación. En la carta de esta página arma su pedido y lo envía por WhatsApp a recepción."],
    ["¿Aceptan mascotas?", "Por confirmar con el hotel. Escríbanos antes de viajar con su mascota."],
    ["¿Emiten factura?", "Por confirmar con el hotel. Si viaja por empresa, indíquelo en su consulta para coordinar."]
  ],
  "politicas": [
    ["Check-in", "desde las 09:00", True],
    ["Check-out", "hasta las 14:00", True],
    ["Recepción", "24 horas", True],
    ["Cancelación", "según tarifa", False],
    ["Niños", "a consultar", False],
    ["Mascotas", "a consultar", False],
    ["Formas de pago", "a confirmar", False]
  ],
  "planes": [
    {"id": "trabajo", "t": "Trabajo", "s": "Reuniones, visitas a campo o cursos", "ic": "brief", "room": "simple", "g": 1, "aero": False,
     "h": "Para trabajar tranquilo", "d": "Una habitación simple o matrimonial con Wi-Fi, ambiente climatizado y baño privado. La recepción atiende 24 h, así que puede llegar después de su jornada.",
     "tags": ["Wi-Fi", "Climatizado", "Cochera", "Recepción 24 h"], "hl": ["rec", "chk"]},
    {"id": "descanso", "t": "Descanso", "s": "Escapada en pareja", "ic": "heart", "room": "hidro", "g": 2, "aero": False,
     "h": "Para desconectar", "d": "La matrimonial con hidromasaje (solo algunas habitaciones), piscina en temporada y resto bar para cerrar la noche sin salir del hotel.",
     "tags": ["Hidromasaje", "Piscina de temporada", "Resto bar", "Climatizado"], "hl": ["pis", "bar"]},
    {"id": "familia", "t": "Familia", "s": "Viaje con niños o parientes", "ic": "fam", "room": "triple", "g": 3, "aero": False,
     "h": "Para ir todos juntos", "d": "Una habitación triple para no separarse, desayuno en el American Café y piscina en temporada para los más chicos.",
     "tags": ["Hasta 3 personas", "Desayuno", "Piscina de temporada", "Cochera"], "hl": ["des", "pis"]},
    {"id": "paso", "t": "De paso", "s": "Vuelo o bus con horario raro", "ic": "plane", "room": "matri", "g": 1, "aero": True,
     "h": "Para llegar a cualquier hora", "d": "Recepción 24 h, traslado desde el aeropuerto y cochera si viaja en auto. Avise la hora de su vuelo o bus y lo reciben.",
     "tags": ["Recepción 24 h", "Traslado aeropuerto", "Cochera", "Check-in anticipado"], "hl": ["rec", "chk"]}
  ],
  "reloj": [
    {"k": "rec", "n": "Recepción", "r": [[0, 24]], "c": "#45c7cf", "t": "24 h", "real": True},
    {"k": "chk", "n": "Check-in", "r": [[9, 24]], "c": "#f3b65b", "t": "desde 09:00", "real": True},
    {"k": "des", "n": "Desayuno · American Café", "r": [[7, 10]], "c": "#e58f3b", "t": "07:00 a 10:00", "real": False},
    {"k": "pis", "n": "Piscina (de temporada)", "r": [[10, 18]], "c": "#7fd6ff", "t": "10:00 a 18:00", "real": False},
    {"k": "bar", "n": "Resto bar", "r": [[18, 23]], "c": "#c99bff", "t": "18:00 a 23:00", "real": False}
  ],
  "horas": [
    [0, 5, "Llega de madrugada: avise por WhatsApp y recepción (24 h) lo espera. Se revisa si puede entrar antes de las 09:00."],
    [5, 9, "Antes del check-in de las 09:00: pida entrada anticipada y deje el equipaje en recepción si hace falta."],
    [9, 10, "Check-in abierto y desayuno todavía servido (horario de ejemplo)."],
    [10, 14, "Check-in abierto. Es la hora en que salen los huéspedes de la noche anterior (check-out hasta las 14:00)."],
    [14, 18, "Tarde tranquila: habitaciones listas, y la piscina si es temporada (por confirmar)."],
    [18, 23, "Noche: resto bar abierto (horario de ejemplo) y recepción 24 h para lo que necesite."],
    [23, 24, "Llegada tardía: recepción 24 h. Avise y le dejan la habitación lista."]
  ],
  "tema": {"v1": {}, "v2": {}}
}
