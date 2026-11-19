# Config de Jaenitos Coffee Point (Jaén). Solo datos: el diseño vive en plantilla (hotel/plantilla.html + parte.css + cuerpo.html).
# Fuentes de datos reales: Facebook e Instagram del negocio, Cafelab (2021), Rumbos de Sol & Piedra (2022), ficha de Google Maps.
# "real": True = dato público del negocio/prensa. Todo precio, horario, agenda y carta va como ejemplo.
T = lambda n, d, p, k=None, tags=None, real=False: {"id": k, "n": n, "d": d, "p": p, "tags": tags, "real": real}
def tg(s, i, t, l): return {"s": s, "i": i, "t": t, "l": l}
CFG = {
  "banner": "Boceto de propuesta preparado por <b>Kevin Huamán</b> para Jaenitos Coffee Point · La <b>carta, los precios, los horarios y la agenda de música</b> son de ejemplo, las fotos son referenciales y los colores son de prueba hasta ver su logo",
  "nombre": "Jaenitos Coffee Point", "ciudad": "Jaén", "region": "Cajamarca", "inicial": "J", "logo": None,
  "direccion": "Malecón Turístico, Puente Mesones Muro, Jaén (Parque Héroes del Cenepa)",
  "ubicacionCorta": "Malecón Turístico de Jaén",
  "wa": "51985236008", "telefonoTxt": "985 236 008", "instagram": "coffeepointjaen", "facebook": "Jaenitos Coffee POINT",
  "mapsQ": "Jaenitos Coffee Point Malecón Turístico Jaén Cajamarca",
  "google": {"nota": "4,2", "n": 40},
  "vista1": "Verde cafetal", "vista2": "Noche de malecón",
  "titular1": "El café de Jaén, <em>con corazón</em> y frente al malecón",
  "lead1": "Cuéntenos cómo le gusta su café y la carta le recomienda uno. Pídalo para llevar o reserve su mesa en la terraza, todo en un minuto por WhatsApp.",
  "titular2": "¿Qué sabor le pide el cuerpo <em>hoy?</em>",
  "lead2": "Toque un sabor de la rueda, ajuste intensidad y temperatura, y descubra qué pedir. Después arme su pedido o reserve su mesa.",
  "stats": [["4,2 ★", "Calificación en Google (40 reseñas)"], ["+4 mil", "Seguidores en Facebook"], ["+1,3 mil", "Seguidores en Instagram"], ["Terraza", "Frente al malecón"]],
  "sabores": [
    {"k": "frutal", "n": "Frutal", "c": "#ff9a9a"}, {"k": "floral", "n": "Floral", "c": "#f2b8e0"},
    {"k": "chocolate", "n": "Chocolate", "c": "#c9915e"}, {"k": "caramelo", "n": "Caramelo", "c": "#f2b862"},
    {"k": "nuez", "n": "Nuez", "c": "#d9bc8e"}, {"k": "citrico", "n": "Cítrico", "c": "#f2e56c"}
  ],
  "recojo": [["ya", "Lo antes posible"], ["15", "En 15 minutos"], ["30", "En 30 minutos"], ["45", "En 45 minutos"], ["60", "En 1 hora"]],
  "carta": [
    {"n": "Café de especialidad", "items": [
      T("Espresso", "Corto e intenso, para quien quiere el sabor del grano", 6, "c1", tg(["chocolate", "nuez"], "fuerte", "caliente", False)),
      T("Americano", "Espresso alargado con agua caliente", 7, "c2", tg(["chocolate", "caramelo"], "media", "caliente", False)),
      T("Cappuccino", "Espresso con leche vaporizada y espuma", 10, "c3", tg(["caramelo", "chocolate"], "media", "caliente", True), True),
      T("Mocaccino", "Espresso, chocolate y leche", 11, "c4", tg(["chocolate", "caramelo"], "suave", "caliente", True), True),
      T("Café filtrado V60", "Taza limpia y aromática, preparada al momento", 12, "c5", tg(["frutal", "floral", "citrico"], "suave", "caliente", False)),
      T("Café en sifón belga", "Preparación en mesa, con demostración", 14, "c6", tg(["floral", "frutal"], "media", "caliente", False), True)
    ]},
    {"n": "Fríos y frappés", "items": [
      T("Frappé de café", "Café helado batido con crema", 13, "f1", tg(["chocolate", "caramelo"], "suave", "frio", True), True),
      T("Chilcano de café", "Café, limón y ginger ale, bien helado", 12, "f2", tg(["citrico", "frutal"], "media", "frio", False), True),
      T("Cold brew", "Café en frío, 12 horas de extracción", 12, "f3", tg(["nuez", "chocolate"], "fuerte", "frio", False)),
      T("Café helado con leche", "Espresso sobre hielo y leche", 11, "f4", tg(["caramelo", "nuez"], "suave", "frio", True))
    ]},
    {"n": "Para comer", "items": [
      T("Chaufa Amazónico", "Fusión de comida oriental con sabores de la selva", 20, "m1", None, True),
      T("Sándwich de pollo", "Pan artesanal, pollo deshilachado y verduras", 12, "m2"),
      T("Tostadas con palta", "Dos tostadas con palta y huevo", 12, "m3"),
      T("Empanada de pollo", "Horneada, con ají suave", 6, "m4")
    ]},
    {"n": "Postres", "items": [
      T("Torta del día", "Pregunte por el sabor de hoy", 9, "p1"),
      T("Brownie con helado", "Tibio, con una bola de vainilla", 12, "p2"),
      T("Cheesecake de maracuyá", "Cremoso y ácido", 11, "p3")
    ]}
  ],
  "metodos": [
    {"ic": "mach", "n": "Espresso", "d": "Extracción corta a presión: sabor intenso, base del cappuccino y el mocaccino.", "real": False},
    {"ic": "drip", "n": "V60", "d": "Filtrado a mano: taza limpia, notas frutales y florales.", "real": False},
    {"ic": "press", "n": "Prensa francesa", "d": "Cuerpo más denso y sabor redondo, ideal para compartir.", "real": False},
    {"ic": "flask", "n": "Sifón belga", "d": "Preparación espectacular en mesa; el local lo muestra a sus clientes.", "real": True},
    {"ic": "ice", "n": "Cold brew", "d": "Extracción en frío, suave y poco ácida, para días de calor.", "real": False},
    {"ic": "cup", "n": "Chilcano de café", "d": "Una de las bebidas que más piden en el local.", "real": True}
  ],
  "historiaTitulo": "Cultura cafetalera, hecha en Jaén",
  "historia": "Jaenitos Coffee Point nació como un emprendimiento de jóvenes de Jaén para promover la cultura del café y el consumo del café de la propia región. Su terraza mira al malecón y al río Amojú. Esta sección contaría su historia con fotos y palabras del propio equipo.",
  "historiaPuntos": ["Promueven el consumo del café de la región", "Terraza al aire libre frente al malecón", "Recojo de pedidos en el local", "Bebidas más pedidas: cappuccino, mocaccino, frappé y chilcano de café"],
  "datos": [
    {"ic": "seed", "t": "Café de productor", "d": "Según prensa (2021), trabajaron con el café de un productor de la región premiado en un concurso de cafés especiales.", "real": True},
    {"ic": "sun", "t": "Terraza", "d": "Asientos al aire libre con vista al malecón turístico.", "real": True},
    {"ic": "bag", "t": "Recojo en el local", "d": "Pida desde su celular y pase a recoger.", "real": True},
    {"ic": "heart", "t": "Café con corazón", "d": "Es el lema con el que se presentan en Instagram.", "real": True}
  ],
  "agenda": [
    ["Vie", "20", "Noche acústica", "Música en vivo en la terraza · 7:30 pm (ejemplo)"],
    ["Sáb", "21", "Cata de cafés de la región", "Prueba guiada de 3 cafés · 5:00 pm (ejemplo)"],
    ["Vie", "27", "Noche de covers", "Música en vivo en la terraza · 8:00 pm (ejemplo)"]
  ],
  "galeria": [
    {"c": "Terraza", "t": "Terraza frente al malecón", "ic": "sun"},
    {"c": "Café", "t": "Sifón belga en mesa", "ic": "flask"},
    {"c": "Café", "t": "Cappuccino con arte latte", "ic": "cup"},
    {"c": "Café", "t": "Chilcano de café", "ic": "ice"},
    {"c": "Comida", "t": "Chaufa Amazónico", "ic": "food"},
    {"c": "Comida", "t": "Postres del día", "ic": "cake"},
    {"c": "Noches", "t": "Música en vivo", "ic": "music"},
    {"c": "Terraza", "t": "El malecón de noche", "ic": "key"}
  ],
  "reseñasTexto": "Es la calificación real del local en Google. Con permiso de la dueña, aquí se mostrarían reseñas de clientes con su nombre y fecha; por ahora no se inventa ninguna.",
  "comoLlegar": "En el Malecón Turístico de Jaén, junto al Puente Mesones Muro y frente al Parque Héroes del Cenepa.",
  "mesaTexto": "Reserve su mesa en la terraza para venir en pareja, con amigos o en familia. El local le confirma por WhatsApp.",
  "horasMesa": ["4:00 pm", "5:00 pm", "6:00 pm", "7:00 pm", "8:00 pm", "9:00 pm"],
  "ocasiones": ["Solo café y conversación", "Cita", "Cumpleaños", "Reunión de trabajo", "Con amigos", "En familia"],
  "faq": [
    ["¿Puedo pedir para recoger?", "Sí. Arme su pedido en la carta, elija la hora de recojo y envíelo por WhatsApp; el local lo prepara y usted pasa por él."],
    ["¿Tienen terraza?", "Sí, la cafetería tiene asientos al aire libre frente al malecón. Puede reservar su mesa desde esta página."],
    ["¿Hay música en vivo?", "El local ha tenido sesiones de música en vivo. Las fechas de esta página son de ejemplo; el local las confirma."],
    ["¿Hacen la demostración del sifón belga?", "Es un método que el local ha mostrado a sus clientes. Pregunte por la disponibilidad al hacer su pedido o reserva."],
    ["¿Venden café en grano?", "Por confirmar con el local. Escríbanos si desea llevar café de la región a casa."],
    ["¿Atienden cumpleaños o reuniones?", "Por confirmar con el local. Indique la fecha y la cantidad de personas en su consulta."],
    ["¿Qué formas de pago aceptan?", "Por confirmar con el local."]
  ],
  "politicas": [
    ["Pedidos para llevar", "por WhatsApp", True],
    ["Asientos al aire libre", "sí", True],
    ["Horario de atención", "a confirmar", False],
    ["Reserva de mesa", "por WhatsApp", False],
    ["Formas de pago", "a confirmar", False]
  ],
  "tema": {"v1": {}, "v2": {}}
}
