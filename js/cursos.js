// Biblioteca de cursos. Contenido original, escrito para esta app.
// Estructura: curso → lecciones → texto (párrafos) + quiz de 3 preguntas.

window.CURSOS = [

  {
    id: "historia",
    portada: "images/h3.webp",
    tema: "Historia",
    titulo: "Las cuatro rupturas",
    sub: "1789 · 1830 · 1917 · 1989",
    desc: "Cuatro momentos en que el mundo dejó de funcionar como antes. Qué se rompió, quién lo rompió y qué quedó.",
    lecciones: [
      {
        id: "h1",
        img: "images/h1.webp",
        titulo: "1789: el fin del Antiguo Régimen",
        min: 5,
        texto: [
          "En 1789 Francia era el país más poblado de Europa occidental y también uno de los más desiguales. La sociedad se dividía en tres estados: la gente de la iglesia, la nobleza y el tercer estado —artesanos, campesinos, burgueses—, que era alrededor del 97 % de la población y pagaba casi todos los impuestos. Nobles y clérigos tenían privilegios fiscales y jurídicos.",
          "El detonante no fue el hambre, aunque el pan costaba más de la mitad del salario de un jornalero. Fue fiscal: décadas de guerras, incluido el apoyo a la independencia de Estados Unidos, habían vaciado las arcas. Luis XVI convocó los Estados Generales para mayo de 1789, la primera reunión desde 1614. El tercer estado exigió votar por persona y no por grupo social, se declaró Asamblea Nacional en junio y juró no separarse hasta dar una constitución.",
          "El 14 de julio de 1789 una multitud tomó la Bastilla buscando pólvora. En agosto se aprobó la Declaración de los Derechos del Hombre y del Ciudadano. Vino una monarquía constitucional, luego la república en 1792, la ejecución de Luis XVI en enero de 1793 y el Terror, con Robespierre al frente del Comité de Salvación Pública, que envió a la guillotina a decenas de miles de personas antes de caer él mismo en 1794.",
          "El Directorio gobernó después, hasta que en 1799 un general de 30 años llamado Napoleón Bonaparte dio un golpe de Estado. La revolución terminó, pero dejó algo irreversible: la idea de que la ley es igual para todos y que el poder propio no viene de Dios sino de la nación."
        ],
        quiz: [
          { q: "¿Qué porcentaje de la población formaba el tercer estado?", o: ["Alrededor del 50 %", "Alrededor del 75 %", "Alrededor del 97 %", "Un tercio exacto"], a: 2,
            e: "Clero y nobleza eran una minoría; casi todo el país era tercer estado y pagaba los impuestos." },
          { q: "¿Qué hecho de julio de 1789 se volvió el símbolo del inicio de la revolución?", o: ["La ejecución de Luis XVI", "La toma de la Bastilla", "El juramento del Jeu de Paume", "La batalla de Valmy"], a: 1,
            e: "El 14 de julio de 1789 la multitud tomó la fortaleza buscando pólvora. Hoy es la fiesta nacional francesa." },
          { q: "¿Quién dirigió el período conocido como el Terror?", o: ["Danton", "Robespierre", "Napoleón", "Lafayette"], a: 1,
            e: "Robespierre encabezó el Comité de Salvación Pública entre 1793 y 1794; fue ejecutado en julio de 1794." }
        ]
      },
      {
        id: "h2",
        img: "images/h2.webp",
        titulo: "1830: la máquina cambia al ser humano",
        min: 5,
        texto: [
          "La Revolución Industrial no fue un día, fue un proceso de un siglo que empezó en Gran Bretaña. Tenía carbón barato, hierro, ríos navegables, un imperio que compraba algodón y producía mercados, y un sistema financiero que prestaba capital. La máquina de vapor de James Watt, mejorada en 1769, fue el motor: convirtió el calor del carbón en movimiento continuo.",
          "Antes, el trabajo textil se hacía en casa, con telares manuales, y el ritmo lo marcaba el trabajador. Con el telar mecánico y la fábrica, el ritmo lo marcó la máquina. La jornada pasó a 12, 14 y hasta 16 horas; el trabajo infantil era normal. El ferrocarril, desde 1825 y sobre todo desde la línea Liverpool-Manchester en 1830, encogió las distancias y abarató el transporte de carbón, hierro y personas.",
          "Las consecuencias fueron enormes y contradictorias. Ciudades como Manchester crecieron sin alcantarillas ni agua limpia; el cólera mató a decenas de miles. Al mismo tiempo, la producción por persona se multiplicó y el precio de la ropa y los utensilios cayó. En 1833 el parlamento británico aprobó la primera Ley de Fábrica, que limitó el trabajo infantil en la industria textil; los sindicatos solo se legalizaron en 1871.",
          "La segunda fase, desde 1870, trajo acero barato, química, electricidad y petróleo. Alemania y Estados Unidos superaron a Gran Bretaña. Y con las fábricas nació una pregunta que sigue abierta: qué pasa con las personas cuando su oficio desaparece."
        ],
        quiz: [
          { q: "¿En qué país comenzó la Revolución Industrial?", o: ["Francia", "Gran Bretaña", "Alemania", "Estados Unidos"], a: 1,
            e: "Gran Bretaña combinó carbón, capital, imperio y estabilidad política antes que nadie." },
          { q: "¿Qué cambió con la fábrica respecto al taller doméstico?", o: ["Se trabajaba menos horas", "El ritmo lo imponía la máquina", "Desapareció el trabajo infantil", "Se pagaba por pieza"], a: 1,
            e: "El trabajador dejó de controlar el ritmo: la máquina y el turno lo marcaban." },
          { q: "¿Qué ley de 1833 fue pionera en regular el trabajo infantil?", o: ["La Ley de Pobres", "La Ley de Fábrica", "La Ley de Sindicatos", "La Ley de Comercio"], a: 1,
            e: "La Ley de Fábrica de 1833 limitó horas y edad mínima en la industria textil británica." }
        ]
      },
      {
        id: "h3",
        img: "images/h3.webp",
        titulo: "1917: el imperio que se cae en un año",
        min: 5,
        texto: [
          "Rusia entró a la Primera Guerra Mundial en 1914 con un ejército enorme y mal equipado. Para 1917 acumulaba millones de bajas y una inflación que convertía el pan en un lujo. En febrero —marzo en el calendario gregoriano— las mujeres de Petrogrado salieron a pedir pan por el Día Internacional de la Mujer. La huelga se extendió, la guarnición se negó a disparar y el zar Nicolás II abdicó.",
          "Se formó un gobierno provisional liberal y, en paralelo, un soviet de obreros y soldados: dos poderes conviviendo. El gobierno decidió seguir la guerra; el país quería paz. Lenin, exiliado en Suiza, regresó en abril con ayuda del alto mando alemán, que apostaba a desestabilizar a su enemigo. Su consigna cabía en tres palabras: pan, paz y tierra.",
          "En octubre —noviembre gregoriano— los bolcheviques tomaron los puntos clave de Petrogrado con una resistencia mínima. Decretaron la paz, repartieron tierra y entregaron las fábricas a los comités obreros. Lo que siguió no fue el paraíso: una guerra civil de tres años, hambre, la epidemia de tifus y la represión de los opositores, empezando por los anarquistas de Kronstadt en 1921.",
          "En 1921 Lenin retrocedió con la Nueva Política Económica, que toleraba mercado y pequeña empresa. En 1922 se creó la Unión Soviética. Y en 1924, con Lenin ya muerto, Stalin empezó la carrera que llevaría a la colectivización forzada, las hambrunas de 1932-33 y los millones de muertos del Gulag."
        ],
        quiz: [
          { q: "¿Qué consigna resumía el programa bolchevique de 1917?", o: ["Orden, patria y fe", "Pan, paz y tierra", "Todo el poder al zar", "Guerra hasta el final"], a: 1,
            e: "Pan para las ciudades, paz con Alemania y tierra para los campesinos: tres demandas que el gobierno provisional no atendió." },
          { q: "¿Qué era el doble poder de 1917?", o: ["Dos zares en el trono", "Gobierno provisional y sóviets", "Rusia y Alemania", "Bolcheviques y mencheviques"], a: 1,
            e: "El gobierno provisional tenía la forma legal; los sóviets tenían el apoyo de obreros y soldados." },
          { q: "¿En qué año se creó la Unión Soviética?", o: ["1917", "1921", "1922", "1924"], a: 2,
            e: "1922. En 1924 murió Lenin y Stalin consolidó el poder." }
        ]
      },
      {
        id: "h4",
        img: "images/h4.webp",
        titulo: "1989: el derrumbe que nadie predijo",
        min: 5,
        texto: [
          "La Unión Soviética llegó a los años ochenta con una economía que ya no crecía, una guerra cara en Afganistán y un grupo dirigente envejecido. En 1985 asumió Mijaíl Gorbachov con dos consignas: glásnost, transparencia, y perestroika, reestructuración económica. No quería terminar con el sistema, quería salvarlo. El accidente de Chernóbil en 1986 mostró lo caro que era el secreto: el Estado tardó días en admitir la magnitud.",
          "La apertura política se le fue de las manos. En marzo de 1989 hubo elecciones con candidatos alternativos. En Polonia, Hungría y Checoslovaquia los movimientos pacíficos ganaron espacio. Hungría abrió su frontera con Austria en agosto y miles de alemanes del Este empezaron a salir por ahí. El 9 de noviembre de 1989 el gobierno de la RDA abrió los pasos hacia Berlín Occidental; esa noche la gente empezó a picar el muro.",
          "En agosto de 1991, un grupo de altos cargos intentó un golpe para frenar la desintegración. Fracasó en tres días, y el fracaso aceleró lo que quería evitar. En diciembre de 1991 la URSS se disolvió y dejó quince repúblicas independientes. La Federación Rusa heredó el arsenal nuclear y el asiento en el Consejo de Seguridad de la ONU.",
          "El fin de la Guerra Fría no trajo un mundo sin conflictos, trajo uno distinto: Yugoslavia se desintegró en guerras, la OTAN se expandió hacia el este y Moscú vivió esa expansión como una amenaza. Ese hilo llega hasta hoy."
        ],
        quiz: [
          { q: "¿Qué significaba glásnost?", o: ["Reforma agraria", "Transparencia informativa", "Rearme nuclear", "Apertura al mercado"], a: 1,
            e: "Glásnost era apertura y transparencia; perestroika era la reestructuración económica." },
          { q: "¿Cuándo cayó el Muro de Berlín?", o: ["1987", "1989", "1990", "1991"], a: 1,
            e: "La noche del 9 de noviembre de 1989 se abrieron los pasos y la gente empezó a derribarlo." },
          { q: "¿Qué pasó en diciembre de 1991?", o: ["Alemania se reunificó", "Se disolvió la URSS", "Cayó el gobierno polaco", "Se creó la OTAN"], a: 1,
            e: "La URSS se disolvió en quince repúblicas; Rusia asumió su lugar en la ONU." }
        ]
      }
    ]
  },

  {
    id: "tecnologia",
    portada: "images/t1.webp",
    tema: "Tecnología",
    titulo: "Cómo llegamos hasta aquí",
    sub: "chips · Internet · IA · móviles",
    desc: "Cuatro inventos que hoy parecen normales y que hace ochenta años no existían. Quién los hizo y qué cambiaron.",
    lecciones: [
      {
        id: "t1",
        img: "images/t1.webp",
        titulo: "Del transistor al chip",
        min: 5,
        texto: [
          "En 1945 la computadora ENIAC ocupaba una sala entera y tenía unas 18.000 válvulas de vidrio. Cada válvula era una bombilla que se calentaba, consumía energía y se quemaba cada pocas horas: mantenerla encendida era un trabajo en sí mismo. El problema no era la lógica —las máquinas ya podían calcular—, sino el interruptor.",
          "El 23 de diciembre de 1947, en los laboratorios Bell, en Nueva Jersey, John Bardeen y Walter Brattain conectaron dos contactos de oro a un cristal de germanio y lograron amplificar una señal. Era el primer transistor: un interruptor sólido, sin vidrio ni vacío, que no se quemaba. William Shockley, su jefe de equipo, perfeccionó la versión de unión en 1948, y los tres compartieron el Nobel de Física en 1956. Diez años después, Jack Kilby, en Texas Instruments, puso varios componentes en una misma pastilla de germanio: el circuito integrado. En 1959 Robert Noyce, en Fairchild, hizo la versión práctica en silicio, con las conexiones impresas en aluminio. Esa es la arquitectura que seguimos usando. Kilby recibió el Nobel en 2000; Noyce había muerto diez años antes.",
          "En 1965 Gordon Moore, químico y futuro cofundador de Intel, notó que el número de componentes por chip se duplicaba más o menos cada año, y en 1975 ajustó el ritmo a dos años. La «ley de Moore» no es una ley de la física: es una observación económica. La industria la tomó como meta y durante medio siglo la cumplió. En 1971 el Intel 4004, primer microprocesador comercial, tenía 2.300 transistores y corría a 740 kHz. Un chip de teléfono actual pasa de los 15.000 millones.",
          "Ese ritmo se está agotando. Un transistor de 2 o 3 nanómetros mide unas pocas decenas de átomos de ancho, y las fugas de corriente y el calor ponen un techo. El costo por transistor ya no baja como antes y una planta de vanguardia cuesta más de 20.000 millones de dólares. La respuesta de la industria es apilar capas, combinar varios chips pequeños —chiplets— y diseñar arquitecturas específicas para inteligencia artificial. Y hay un cuello de botella geopolítico: las máquinas de litografía ultravioleta extrema solo las fabrica ASML, en Países Bajos, y la mayor parte de los chips avanzados sale de TSMC, en Taiwán."
        ],
        quiz: [
          { q: "¿Qué ventaja tenía el transistor frente a las válvulas de vidrio?", o: ["Era más rápido que la electricidad", "No se quemaba ni necesitaba vacío", "No usaba electricidad", "Se podía programar"], a: 1,
            e: "Un transistor es un interruptor sólido: no tiene filamento que se funda ni necesita una ampolla al vacío." },
          { q: "¿Quién hizo la versión práctica en silicio del circuito integrado?", o: ["Jack Kilby", "Robert Noyce", "Gordon Moore", "William Shockley"], a: 1,
            e: "Kilby lo logró primero en germanio (1958); Noyce lo pasó a silicio con interconexiones de aluminio en 1959." },
          { q: "¿Qué dice la ley de Moore?", o: ["Los chips se abaratan cada año", "Los transistores por chip se duplican cada dos años aproximadamente", "La velocidad se triplica cada década", "El precio del silicio es fijo"], a: 1,
            e: "Es una observación sobre la densidad de componentes, no una ley física; se cumplió durante medio siglo." }
        ]
      },
      {
        id: "t2",
        img: "images/t2.webp",
        titulo: "Internet antes de la web",
        min: 5,
        texto: [
          "A principios de los sesenta, las redes de comunicación funcionaban como una central telefónica: si caía el nodo central, todo caía. Paul Baran, en la RAND, y Donald Davies, en el laboratorio británico NPL, llegaron por separado a la misma idea: dividir los mensajes en paquetes pequeños que viajan por rutas distintas y se rearman al llegar. Leonard Kleinrock había publicado la teoría matemática en 1961. A esa técnica se le llama conmutación de paquetes, y es la base de todo lo que vino después.",
          "El 29 de octubre de 1969, un equipo de la Universidad de California en Los Ángeles conectó su computadora con la del Stanford Research Institute. Escribieron «LOGIN» y el sistema se cayó después de «LO». Un mes después había cuatro nodos: UCLA, Stanford, la Universidad de California en Santa Bárbara y la de Utah. La red se llamó ARPANET y era un proyecto del Departamento de Defensa. En 1971 Ray Tomlinson envió el primer correo electrónico y eligió la arroba para separar usuario y máquina. En 1973 Vint Cerf y Robert Kahn diseñaron TCP, que junto a IP permitía unir redes distintas. El 1 de enero de 1983 ARPANET cambió a TCP/IP de golpe, en un solo día coordinado.",
          "Internet ya existía, pero era para universidades. En marzo de 1989 Tim Berners-Lee, un físico británico del CERN en Ginebra, entregó un documento proponiendo un sistema de documentos enlazados por hipertexto sobre esa red. Su jefe lo aprobó con una nota que se hizo famosa: «vago, pero interesante». En 1990 ya funcionaban el primer servidor y el primer navegador; en 1991 abrió el primer sitio público; en 1993 el CERN liberó el código sin regalías, y eso lo cambió todo. Ese mismo año el navegador Mosaic puso imágenes dentro de la página, y en 1994 apareció Netscape.",
          "Conviene no confundir dos cosas. Internet es la infraestructura: cables, routers, el protocolo IP. La web es un servicio que corre encima, como el correo o las videollamadas. Hoy unos 5.500 millones de personas usan Internet, alrededor del 68 % de la humanidad, y más de la mitad del tráfico es video. Lo que empezó como cuatro computadoras conectadas es la obra de ingeniería civil más grande que hemos construido."
        ],
        quiz: [
          { q: "¿En qué año se conectaron los primeros nodos de ARPANET?", o: ["1961", "1969", "1973", "1983"], a: 1,
            e: "El primer enlace fue en octubre de 1969 entre UCLA y Stanford; a fin de año eran cuatro nodos." },
          { q: "¿Qué ocurrió el 1 de enero de 1983?", o: ["Se creó la web", "ARPANET adoptó TCP/IP", "Nació el correo electrónico", "Se abrió la primera web"], a: 1,
            e: "Fue el «flag day»: toda la red pasó a TCP/IP el mismo día, y de ahí sale Internet como red de redes." },
          { q: "¿Cuál es la diferencia entre Internet y la web?", o: ["Son lo mismo", "La web es un servicio que funciona sobre Internet", "Internet es un navegador", "La web es más antigua"], a: 1,
            e: "Internet es la infraestructura de redes; la web es uno de sus servicios, con HTTP y HTML." }
        ]
      },
      {
        id: "t3",
        img: "images/t3.webp",
        titulo: "De Turing a los transformers",
        min: 6,
        texto: [
          "En 1950, Alan Turing publicó un artículo con una pregunta incómoda: «¿pueden pensar las máquinas?». Como no había forma de definir pensar, propuso un experimento: el juego de la imitación. Una persona conversa por texto con otra persona y con una máquina; si no puede distinguir con quién habla, la máquina pasa la prueba. Turing no decía que eso fuera conciencia; decía que era la única pregunta que podíamos responder con evidencia.",
          "En el verano de 1956, en Dartmouth College, se reunieron John McCarthy, Marvin Minsky, Claude Shannon y Nathaniel Rochester para un taller de dos meses. McCarthy acuñó el nombre del campo: inteligencia artificial. Prometieron resultados en una generación y se equivocaron por décadas. Hubo dos inviernos: entre 1974 y 1980, cuando un informe británico y los recortes de financiamiento frenaron la investigación, y entre 1987 y 1993, cuando colapsó el mercado de las máquinas Lisp. La idea de las redes neuronales sobrevivió en los márgenes, con poco dinero y mala reputación.",
          "El giro llegó por dos vías. En 1986 Rumelhart, Hinton y Williams popularizaron la retropropagación del error, el algoritmo que permite ajustar millones de pesos internos. Y en 2012, AlexNet —una red de Krizhevsky, Sutskever y Hinton— ganó el concurso ImageNet entrenando con tarjetas gráficas: el error cayó del 26 % al 15 %. Nadie volvió a mirar igual las GPUs. En 2016 AlphaGo venció a Lee Sedol, y en 2017 un equipo de Google publicó «Attention Is All You Need», el artículo que presentó el transformer.",
          "El transformer permitió entrenar modelos con cantidades enormes de texto en paralelo. De ahí salieron los modelos de lenguaje. ChatGPT se abrió al público en noviembre de 2022 y llegó a 100 millones de usuarios en dos meses: el producto de consumo de adopción más rápida hasta entonces. Lo que vino después son modelos que también ven y oyen, y agentes que ejecutan tareas. Los límites siguen ahí: inventan datos con seguridad, gastan mucha energía y dependen de textos escritos por humanos. Saben predecir muy bien; no sabemos si entienden."
        ],
        quiz: [
          { q: "¿Qué propuso Turing en 1950?", o: ["Construir un cerebro electrónico", "Un test basado en la conversación", "Prohibir las máquinas pensantes", "Un idioma para computadoras"], a: 1,
            e: "El juego de la imitación: si no distingues a la máquina de una persona por chat, pasa la prueba." },
          { q: "¿Qué arquitectura de 2017 hizo posibles los modelos de lenguaje actuales?", o: ["La retropropagación", "El perceptrón", "El transformer", "Las máquinas Lisp"], a: 2,
            e: "El artículo «Attention Is All You Need» introdujo el transformer, base de los modelos actuales." },
          { q: "¿Por qué fue importante AlexNet en 2012?", o: ["Fue el primer programa de ajedrez", "Mostró que entrenar redes con GPUs superaba los métodos clásicos", "Inventó el correo electrónico", "Tradujo por primera vez"], a: 1,
            e: "Ganó ImageNet bajando el error del 26 % al 15 % y abrió la era del aprendizaje profundo." }
        ]
      },
      {
        id: "t4",
        img: "images/t4.webp",
        titulo: "El teléfono que se comió el mundo",
        min: 5,
        texto: [
          "El 3 de abril de 1973, Martin Cooper, ingeniero de Motorola, caminó por una acera de Manhattan con un teléfono de 1,1 kilos y llamó a Joel Engel, de Bell Labs, que trabajaba en la competencia. La primera llamada desde un móvil portátil fue, sobre todo, una provocación entre empresas. La idea de fondo era otra: dividir la ciudad en celdas pequeñas para reutilizar frecuencias en cada una. De ahí viene la palabra «celular».",
          "La primera red comercial llegó en 1979 en Japón, con NTT. En 1983 Motorola puso a la venta el DynaTAC 8000X: 790 gramos, 30 minutos de llamada y 10 horas de carga, por 3.995 dólares de entonces. En 1991 Finlandia estrenó la red 2G GSM, y el 3 de diciembre de 1992 se envió el primer SMS de la historia: «Merry Christmas». En 1999 Japón lanzó i-mode y el teléfono empezó a conectarse a Internet.",
          "El cambio de categoría fue en 2007. El iPhone eliminó el teclado físico, puso una pantalla capacitiva multitáctil y un navegador completo, y convirtió el teléfono en una computadora que se maneja con el dedo. En 2008 llegaron la App Store y el primer Android, y con ellos un ecosistema de aplicaciones que hoy mueve cientos de miles de millones de dólares. El resto fue adopción: hoy hay más líneas móviles que personas.",
          "El smartphone reemplazó la cámara, el GPS, el reloj, la radio, la agenda y, en media docena de países, el dinero en efectivo. También trajo costos: la economía de la atención, la vigilancia publicitaria, la brecha de quienes no tienen acceso y un problema material serio. Cada teléfono lleva cobalto, litio, oro y estaño, a veces extraídos en condiciones duras, y el mundo genera unos 60 millones de toneladas de basura electrónica al año, de las que solo se recicla una quinta parte. La herramienta más ubicua del planeta es también la que más rápido se descarta."
        ],
        quiz: [
          { q: "¿Quién hizo la primera llamada desde un móvil portátil?", o: ["Steve Jobs", "Martin Cooper", "Joel Engel", "Vint Cerf"], a: 1,
            e: "Cooper, de Motorola, llamó en 1973 a su competidor de Bell Labs desde una calle de Nueva York." },
          { q: "¿Qué cambió el iPhone cuando salió en 2007?", o: ["Añadió un teclado físico", "Puso pantalla táctil capacitiva y navegador completo", "Inventó el SMS", "Creó la red 2G"], a: 1,
            e: "Eliminó el teclado y llevó la web completa al bolsillo; en 2008 llegó la App Store." },
          { q: "¿Cuándo se envió el primer SMS?", o: ["1983", "1991", "1992", "1999"], a: 2,
            e: "El 3 de diciembre de 1992, con el mensaje «Merry Christmas» en una red GSM." }
        ]
      }
    ]
  },

  {
    id: "ciencia",
    portada: "images/c1.webp",
    tema: "Ciencia",
    titulo: "Cómo se armó el universo",
    sub: "Del Big Bang al CRISPR",
    desc: "Las cuatro ideas que sostienen la ciencia moderna: expansión, relatividad, evolución y ADN.",
    lecciones: [
      {
        id: "c1",
        img: "images/c1.webp",
        titulo: "El universo tiene fecha de nacimiento",
        min: 5,
        texto: [
          "Hasta 1920, muchos astrónomos pensaban que la Vía Láctea era todo el universo. En 1929 Edwin Hubble midió la luz de galaxias lejanas y encontró algo raro: casi todas se alejaban de nosotros, y las más lejanas lo hacían más rápido. Si todo se separa, en algún momento estuvo junto. Ese dato con fecha es la base del Big Bang.",
          "La idea no era solo de Hubble. Georges Lemaître, un sacerdote y físico belga, la había propuesto en 1927. Pero faltaba la prueba decisiva. En 1965 dos ingenieros de los laboratorios Bell, Arno Penzias y Robert Wilson, encontraron un ruido de fondo que no lograban eliminar: venía de todas partes del cielo, a 2,7 kelvin. Era la radiación fósil del universo temprano, el eco del momento en que la materia se volvió transparente.",
          "La cronología que armamos es esta: 13.800 millones de años atrás, el universo era denso y caliente; en los primeros minutos se formaron los núcleos de hidrógeno, helio y algo de litio; durante 380.000 años la luz rebotaba en la materia; cuando los electrones se unieron a los núcleos, la luz pudo viajar. Eso es lo que vemos como fondo cósmico de microondas.",
          "El modelo tiene cabos sueltos: no explica bien la materia oscura ni la energía oscura, que serían el 95 % del contenido del universo. Pero la expansión, la radiación de fondo y la proporción de elementos encajan con una precisión que no deja mucho espacio a dudas."
        ],
        quiz: [
          { q: "¿Qué observó Hubble en 1929?", o: ["Que las galaxias se acercan", "Que las galaxias se alejan", "Que el universo es estático", "Que la Vía Láctea es única"], a: 1,
            e: "El corrimiento al rojo mostraba que las galaxias se alejan; cuanto más lejos, más rápido." },
          { q: "¿Qué es el fondo cósmico de microondas?", o: ["El brillo de las estrellas", "La radiación fósil del universo temprano", "El polvo de las galaxias", "La luz del Sol reflejada"], a: 1,
            e: "Es la luz liberada unos 380.000 años después del Big Bang, hoy enfriada a 2,7 K." },
          { q: "¿Qué edad tiene el universo?", o: ["4.500 millones de años", "13.800 millones de años", "100.000 millones de años", "1.000 millones de años"], a: 1,
            e: "13.800 millones de años según el modelo cosmológico estándar y las mediciones del fondo cósmico." }
        ]
      },
      {
        id: "c2",
        img: "images/c2.webp",
        titulo: "La gravedad no es una fuerza",
        min: 5,
        texto: [
          "En 1905, Albert Einstein publicó cuatro artículos que cambiaron la física. El de la relatividad especial partía de dos postulados: las leyes de la física son las mismas para todos los observadores que se mueven a velocidad constante, y la velocidad de la luz en el vacío es la misma para todos. De ahí sale una consecuencia incómoda: si la luz no cambia de velocidad, lo que cambia es el tiempo.",
          "Un reloj en movimiento marcha más lento respecto a uno quieto. No es una ilusión: los muones que llegan a la superficie terrestre lo demuestran, y los relojes atómicos en aviones también. De la misma teoría sale la equivalencia entre masa y energía, esa que se escribe E=mc².",
          "En 1915 llegó la relatividad general. Einstein propuso que la gravedad no es una atracción misteriosa sino la curvatura del espacio-tiempo por la masa y la energía. Los planetas no son tirados: siguen la línea más recta posible en un espacio curvado. La teoría predijo cosas rarísimas que después se confirmaron: la luz se desvía al pasar cerca del Sol, medida en el eclipse de 1919; existen ondas gravitacionales, detectadas en 2015; y existen agujeros negros, fotografiados en 2019.",
          "También la usas sin saberlo: los satélites del GPS se mueven rápido y están en un campo gravitatorio más débil, así que sus relojes se desfasan unas decenas de microsegundos al día. Sin corregirlo, el error de posición sería de kilómetros."
        ],
        quiz: [
          { q: "¿Qué propone la relatividad general sobre la gravedad?", o: ["Es una fuerza instantánea", "Es la curvatura del espacio-tiempo", "No existe", "Es electromagnética"], a: 1,
            e: "La masa y la energía curvan el espacio-tiempo; los cuerpos siguen esa geometría." },
          { q: "¿En qué año se detectaron por primera vez ondas gravitacionales?", o: ["1915", "1919", "2015", "2019"], a: 2,
            e: "LIGO las detectó en septiembre de 2015, cien años después de la teoría." },
          { q: "¿Por qué hay que corregir los relojes del GPS?", o: ["Por el calor de la atmósfera", "Por efectos relativistas", "Por el viento solar", "Por la rotación de la Tierra"], a: 1,
            e: "Velocidad y gravedad alteran el ritmo de los relojes; sin corrección el error sería de kilómetros." }
        ]
      },
      {
        id: "c3",
        img: "images/c3.webp",
        titulo: "La evolución no es una opinión",
        min: 5,
        texto: [
          "En 1859 Charles Darwin publicó El origen de las especies. No fue el primero en sugerir que las especies cambian, pero sí el primero en proponer un mecanismo comprobable: la selección natural. La lógica es simple y no necesita ningún plan: los individuos varían, esa variación se hereda, y algunos dejan más descendencia que otros.",
          "Si una variación ayuda a sobrevivir o a reproducirse en un ambiente concreto, se vuelve más común con las generaciones. No hay dirección ni objetivo. Un rasgo puede ser útil hoy y una carga mañana. La presión la ejerce el ambiente, incluidos los depredadores, el clima y la competencia dentro de la misma especie.",
          "Darwin no conocía la genética. Gregor Mendel había publicado sus leyes en 1866 y quedaron olvidadas hasta 1900. La síntesis moderna, entre 1930 y 1940, unió genética, paleontología y ecología: las mutaciones aportan la variación y la selección la filtra. Desde 1953, con la estructura del ADN, sabemos exactamente dónde se guarda esa información.",
          "Las pruebas no son una sola: fósiles de transición, órganos homólogos, la distribución geográfica de las especies, la resistencia de bacterias a los antibióticos y las secuencias de ADN compartidas. La evolución no explica el origen de la vida; explica cómo cambia lo vivo una vez que existe."
        ],
        quiz: [
          { q: "¿Qué tres ingredientes necesita la selección natural?", o: ["Mutación, azar y extinción", "Variación, herencia y presión selectiva", "ADN, ARN y proteínas", "Clima, comida y depredadores"], a: 1,
            e: "Sin variación heredable no hay materia prima; sin presión, no hay filtro." },
          { q: "¿Quién sentó las bases de la genética en 1866?", o: ["Darwin", "Mendel", "Lamarck", "Wallace"], a: 1,
            e: "Gregor Mendel describió las leyes de la herencia con guisantes; se redescubrieron en 1900." },
          { q: "¿Qué explica la evolución y qué no?", o: ["Explica el origen de la vida", "Explica el cambio de lo vivo, no su origen", "Explica ambos", "No explica ninguno"], a: 1,
            e: "La evolución describe cómo cambian las poblaciones; el origen de la vida es otro problema científico." }
        ]
      },
      {
        id: "c4",
        img: "images/c4.webp",
        titulo: "El manual de instrucciones",
        min: 5,
        texto: [
          "En 1953, James Watson y Francis Crick publicaron en Nature la estructura del ADN: una doble hélice con dos cadenas enfrentadas. La pieza clave fue la fotografía 51, tomada por Rosalind Franklin con difracción de rayos X, y los datos de Maurice Wilkins. Franklin murió en 1958, a los 37 años, y su papel tardó décadas en reconocerse.",
          "La molécula se lee con cuatro letras: A, T, G y C. Se emparejan siempre igual, A con T y G con C, y eso permite copiarla. El código funciona por tripletes: cada tres letras forman un codón, y cada codón indica un aminoácido o una señal de parada. Con cuatro letras y grupos de tres salen 64 combinaciones para 20 aminoácidos: el código está redundante, pero no es ambiguo.",
          "El Proyecto Genoma Humano tardó trece años y se completó en 2003. Costó unos 3.000 millones de dólares. Hoy secuenciar un genoma completo cuesta menos que un teléfono. Tenemos unos 20.000 genes, menos de los que se esperaba, y la mayoría del ADN no codifica proteínas: regula, estructura o no tiene función conocida.",
          "En 2012 Jennifer Doudna y Emmanuelle Charpentier describieron CRISPR-Cas9, una herramienta que permite cortar y editar el ADN con precisión. Recibieron el Nobel en 2020. Ya se usa para tratar la anemia falciforme y para diagnosticar, pero también abre preguntas éticas que la técnica no resuelve."
        ],
        quiz: [
          { q: "¿Qué aportó Rosalind Franklin a la estructura del ADN?", o: ["El modelo teórico", "La fotografía 51 de difracción", "Los experimentos con bacterias", "La secuenciación completa"], a: 1,
            e: "Su imagen de rayos X mostró la forma helicoidal y fue clave para el modelo de 1953." },
          { q: "¿Cómo se lee el código genético?", o: ["De dos en dos letras", "De tres en tres letras", "Letra por letra", "Por párrafos"], a: 1,
            e: "Cada triplete o codón codifica un aminoácido; hay 64 combinaciones posibles." },
          { q: "¿Qué permite CRISPR-Cas9?", o: ["Secuenciar ADN", "Editar ADN con precisión", "Crear proteínas nuevas", "Clonar organismos"], a: 1,
            e: "Es una tijera molecular guiada por ARN que corta una secuencia concreta del ADN." }
        ]
      }
    ]
  },

  {
    id: "filosofia",
    portada: "images/f3.webp",
    tema: "Filosofía",
    titulo: "Atenas sigue hablando",
    sub: "Sócrates · Platón · Aristóteles · estoicos",
    desc: "Cuatro maneras de preguntar que todavía sirven para pensar tu propia vida.",
    lecciones: [
      {
        id: "f1",
        img: "images/f1.webp",
        titulo: "Sócrates: preguntar hasta el fondo",
        min: 4,
        texto: [
          "Sócrates no escribió nada. Lo conocemos por lo que otros contaron, sobre todo Platón y Jenofonte, y por eso es difícil separar al personaje del retrato. Lo que sí está claro es su método: no enseñaba doctrinas, hacía preguntas. En el ágora de Atenas detenía a cualquiera y le pedía que definiera algo que creía saber, como la justicia o el valor.",
          "La técnica se llama elenchos: llevar al interlocutor a una contradicción para que abandone una creencia falsa. Sócrates decía que no sabía nada y que su única ventaja era saberlo. De ahí viene la mayéutica, el arte de ayudar a parir ideas: la verdad no se mete desde fuera, se saca de dentro con preguntas.",
          "En 399 a. C. lo juzgaron por impiedad y por corromper a la juventud. La Atenas derrotada buscaba culpables, y Sócrates tenía enemigos. Lo condenaron a muerte. Sus amigos prepararon una fuga y él la rechazó: si vivió bajo las leyes de la ciudad, no iba a romperlas para salvarse. Bebió la cicuta a los 70 años.",
          "Su método sigue siendo incómodo, y por eso sirve. Antes de aceptar una idea, pregúntate qué significa exactamente, en qué se basa y qué se seguiría de ella. Es la base del pensamiento crítico y también del método científico."
        ],
        quiz: [
          { q: "¿Cómo se llama el método de llevar al interlocutor a la contradicción?", o: ["Mayéutica", "Elenchos", "Dialéctica hegeliana", "Silogismo"], a: 1,
            e: "El elenchos es la refutación por preguntas; la mayéutica es el arte de ayudar a parir ideas." },
          { q: "¿Por qué Sócrates rechazó escapar de la condena?", o: ["Tenía miedo", "Lealtad a las leyes de la ciudad", "Esperaba un indulto", "Quería fama"], a: 1,
            e: "Argumentó que quien vive bajo unas leyes no puede romperlas cuando lo perjudican." },
          { q: "¿Qué caracteriza su forma de enseñar?", o: ["Escribir tratados", "Preguntar en lugar de afirmar", "Dar discursos", "Enseñar matemáticas"], a: 1,
            e: "No dejó obra escrita: su filosofía era una práctica pública de preguntas." }
        ]
      },
      {
        id: "f2",
        img: "images/f2.webp",
        titulo: "Platón: la cueva y las sombras",
        min: 5,
        texto: [
          "Platón fue discípulo de Sócrates y fundó la Academia hacia 387 a. C., la institución educativa más duradera de la Antigüedad. Su obra está escrita en diálogos, casi todos con Sócrates como personaje. La pregunta que lo obsesiona es esta: si todo lo que vemos cambia y se corrompe, ¿cómo puede haber conocimiento verdadero?",
          "Su respuesta es la teoría de las Ideas. Existen dos mundos: el sensible, que cambia y se percibe con los sentidos, y el inteligible, donde están las formas puras —la Belleza, la Justicia, el Círculo perfecto—, que se captan con la razón. Lo que vemos son copias imperfectas. El conocimiento verdadero es recordar esas formas, no descubrirlas en la experiencia.",
          "La alegoría de la caverna, en el libro VII de La República, lo resume: unos prisioneros encadenados ven sombras proyectadas en una pared y creen que eso es la realidad. Uno se libera, sale, se deslumbra con el sol y vuelve a contárselo a los demás. No le creen, y a veces lo matan. La alegoría es también una advertencia sobre el costo de saber.",
          "En La República propone una ciudad gobernada por filósofos y organizada en clases. Es una idea difícil de alcanzar para lectores modernos, pero deja una idea potente: gobernar exige conocimiento, no solo voluntad o popularidad."
        ],
        quiz: [
          { q: "¿Qué representan las sombras en la caverna?", o: ["La verdad", "Las apariencias que tomamos por realidad", "Las ideas puras", "La política ateniense"], a: 1,
            e: "Los prisioneros confunden las sombras con lo real: es la imagen del conocimiento limitado." },
          { q: "¿Qué son las Ideas para Platón?", o: ["Pensamientos personales", "Formas puras e inmutables", "Dioses", "Leyes escritas"], a: 1,
            e: "Son las esencias perfectas e inmutables de las cosas, captables solo por la razón." },
          { q: "¿Qué institución fundó Platón?", o: ["El Liceo", "La Academia", "El Jardín", "El Pórtico"], a: 1,
            e: "La Academia, hacia 387 a. C. El Liceo fue de Aristóteles, el Jardín de Epicuro y el Pórtico de Zenón." }
        ]
      },
      {
        id: "f3",
        img: "images/f3.webp",
        titulo: "Aristóteles: bajar las ideas al suelo",
        min: 5,
        texto: [
          "Aristóteles llegó a la Academia a los 17 años y se quedó veinte. Fue maestro de Alejandro Magno y fundó su propia escuela, el Liceo, donde enseñaba caminando: de ahí el nombre de peripatéticos. Su obra cubre lógica, física, biología, ética, política, retórica y poética. Durante casi dos mil años fue, para Europa y el mundo islámico, la referencia de lo que se podía saber.",
          "Contra Platón, sostuvo que las formas no están en otro mundo sino en las cosas mismas. Para explicar algo no basta decir qué es: hay que responder por qué. De ahí su teoría de las cuatro causas: la material (de qué está hecho), la formal (qué es), la eficiente (qué lo produjo) y la final (para qué). Un vaso es cerámica, es un recipiente, lo hizo un alfarero y sirve para beber.",
          "En ética, su idea central es que la virtud es un término medio entre dos extremos. El valor está entre la cobardía y la temeridad; la generosidad, entre la tacañería y la prodigalidad. No hay una regla automática: la virtud se aprende con hábito y se ajusta a las circunstancias, con prudencia.",
          "También inventó la lógica formal. El silogismo —si todos los hombres son mortales y Sócrates es hombre, Sócrates es mortal— sigue siendo el modelo de razonamiento deductivo válido. Su biología tenía errores, pero su método, observar y clasificar, era el correcto."
        ],
        quiz: [
          { q: "¿De quién fue maestro Aristóteles?", o: ["Sócrates", "Alejandro Magno", "Platón", "Julio César"], a: 1,
            e: "Fue tutor de Alejandro Magno en Macedonia antes de fundar el Liceo en Atenas." },
          { q: "¿Cuáles son las cuatro causas aristotélicas?", o: ["Material, formal, eficiente y final", "Pasado, presente, futuro y azar", "Física, química, biológica y social", "Lógica, ética, política y estética"], a: 0,
            e: "Responden de qué está hecho, qué es, quién lo hizo y para qué sirve." },
          { q: "¿Cómo define la virtud en la ética?", o: ["Como un extremo", "Como un término medio", "Como un mandato divino", "Como un cálculo de placer"], a: 1,
            e: "La virtud está entre dos vicios, uno por exceso y otro por defecto, y se adquiere con hábito." }
        ]
      },
      {
        id: "f4",
        img: "images/f4.webp",
        titulo: "Estoicismo: lo que sí depende de ti",
        min: 4,
        texto: [
          "El estoicismo nació en Atenas hacia el 300 a. C. con Zenón de Citio, que enseñaba bajo un pórtico pintado: la stoa. Llegó a Roma y allí produjo sus textos más conocidos: las cartas de Séneca, las clases de Epicteto, recogidas por su alumno Arriano, y el diario personal de Marco Aurelio, emperador entre 161 y 180.",
          "Su núcleo es una distinción práctica: hay cosas que dependen de ti —tus juicios, tus decisiones, tus deseos— y cosas que no —el cuerpo, la reputación, el clima, la muerte, lo que otros hacen—. El error que produce sufrimiento es tratar lo segundo como si fuera lo primero. Epicteto lo decía así: no son los hechos los que perturban a los hombres, sino las opiniones sobre los hechos.",
          "De ahí no se sigue pasividad. El estoico actúa con todo su esfuerzo en lo que puede cambiar, y acepta el resultado sin desesperarse. Séneca, que fue consejero de Nerón y terminó suicidándose por orden del emperador, escribió sobre la brevedad de la vida y la serenidad del ánimo en medio del poder.",
          "La psicología moderna lo redescubrió: Albert Ellis y Aaron Beck, padres de la terapia cognitiva, reconocieron su deuda con Epicteto. La idea de que entre el estímulo y la respuesta hay una interpretación es, en buena medida, estoica."
        ],
        quiz: [
          { q: "¿Quién fundó el estoicismo?", o: ["Epicteto", "Zenón de Citio", "Séneca", "Marco Aurelio"], a: 1,
            e: "Zenón enseñaba en el pórtico (stoa) de Atenas hacia el 300 a. C." },
          { q: "¿En qué consiste la dicotomía del control?", o: ["Controlar a los demás", "Distinguir lo que depende de ti de lo que no", "Evitar el dolor", "Aceptar todo sin actuar"], a: 1,
            e: "Solo tus juicios y decisiones dependen de ti; el resto se acepta y se gestiona." },
          { q: "¿Qué emperador romano escribió Meditaciones?", o: ["Nerón", "Trajano", "Marco Aurelio", "Adriano"], a: 2,
            e: "Marco Aurelio escribió sus notas personales en griego, durante campañas militares." }
        ]
      }
    ]
  },

  {
    id: "economia",
    portada: "images/e2.webp",
    tema: "Economía",
    titulo: "Dinero, precios y deuda",
    sub: "Lo que mueve tu bolsillo",
    desc: "Por qué el dinero vale, por qué sube todo y quién paga cuando un país no puede pagar.",
    lecciones: [
      {
        id: "e1",
        img: "images/e1.webp",
        titulo: "Qué es el dinero, en realidad",
        min: 4,
        texto: [
          "Antes del dinero había trueque, pero el trueque tiene un problema: necesitas que la otra persona quiera exactamente lo que tú tienes, y en la cantidad correcta. El dinero resuelve eso. Sirve como medio de intercambio, como unidad de cuenta para comparar precios y como reserva de valor para guardar esfuerzo hacia el futuro.",
          "Las primeras monedas aparecen en Lidia, en la actual Turquía, hacia el siglo VII a. C. Antes se usaron metales, sal, ganado y conchas. Lo importante no era el objeto sino la convención: todos aceptaban eso como pago porque esperaban que otros también lo aceptaran.",
          "El dinero moderno es basado en la confianza: vale porque el Estado lo declara de curso legal y porque la gente confía en él, no porque esté respaldado por oro. En 1944, en Bretton Woods, se fijó el dólar al oro y las demás monedas al dólar. En 1971, Richard Nixon suspendió ese cambio por oro. Desde entonces el respaldo es la credibilidad del banco central y la capacidad de cobrar impuestos.",
          "Además, la mayor parte del dinero no es billete: son depósitos. Cuando un banco concede un crédito, crea un depósito que antes no existía. Por eso la cantidad de dinero depende del crédito, no solo de la imprenta."
        ],
        quiz: [
          { q: "¿Cuáles son las tres funciones del dinero?", o: ["Ahorro, inversión y crédito", "Medio de intercambio, unidad de cuenta y reserva de valor", "Pago, impuesto y salario", "Compra, venta y trueque"], a: 1,
            e: "Permite intercambiar, comparar precios y guardar valor en el tiempo." },
          { q: "¿Qué pasó en 1971 con el dólar?", o: ["Se creó la Reserva Federal", "Se suspendió el cambio por oro en oro", "Se adoptó el euro", "Se fijó al petróleo"], a: 1,
            e: "Nixon cerró la ventanilla del oro: desde entonces el dinero es basado en la confianza." },
          { q: "¿Qué respalda al dinero basado en la confianza?", o: ["El oro en bóveda", "La confianza y el curso legal", "El petróleo", "La deuda externa"], a: 1,
            e: "Su valor depende de la credibilidad del Estado y del banco central, no de un metal." }
        ]
      },
      {
        id: "e2",
        img: "images/e2.webp",
        titulo: "Inflación: el impuesto que no se vota",
        min: 5,
        texto: [
          "La inflación es el aumento sostenido del nivel general de precios. Se mide con el IPC, una lista de bienes y servicios que se considera según el consumo típico de los hogares. Si el IPC sube 8 % en un año, con el mismo sueldo compras 8 % menos: eso es la pérdida de poder de compra.",
          "Las causas se agrupan en tres: presión de demanda —hay más dinero persiguiendo los mismos bienes—, choque de costos —energía, transporte, salarios— y expectativas. Las expectativas son clave: si todos creen que los precios subirán, adelantan compras y fijan precios altos, y la profecía se cumple.",
          "Cuando la inflación se descontrola aparece una inflación descontrolada. En la Alemania de 1923, un dólar llegó a equivaler a unos 4,2 billones de marcos. La gente cobraba el salario y salía corriendo a gastarlo. En Venezuela, una inflación descontrolada de 2017-2021 destruyó el salario y empujó a la dolarización espontánea de la economía.",
          "La inflación no golpea a todos igual. Quien tiene activos —inmuebles, divisas, acciones— se protege. Quien vive de un sueldo fijo o de una pensión pierde. Y el ajuste por inflación, ajustar contratos y salarios por inflación, ayuda a sobrevivir pero puede volver el problema más persistente."
        ],
        quiz: [
          { q: "¿Qué mide el IPC?", o: ["El desempleo", "La variación de precios de una lista", "El PIB", "La tasa de interés"], a: 1,
            e: "El Índice de Precios al Consumidor sigue una lista representativa de consumo." },
          { q: "¿Qué ocurrió en Alemania en 1923?", o: ["Una bajada de precios", "Una inflación descontrolada", "Un impago de deuda", "Una devaluación del 10 %"], a: 1,
            e: "El marco perdió todo su valor: un dólar llegó a equivaler a billones de marcos." },
          { q: "¿A quién perjudica más la inflación?", o: ["A quien tiene inmuebles", "A quien vive de un sueldo fijo", "A quien tiene dólares", "A los exportadores"], a: 1,
            e: "Los ingresos fijos pierden poder de compra; los activos suelen ajustarse." }
        ]
      },
      {
        id: "e3",
        img: "images/e3.webp",
        titulo: "Bancos centrales: el freno y el acelerador",
        min: 5,
        texto: [
          "Un banco central no atiende al público: presta a los bancos y emite la moneda. El más antiguo en funcionar de forma continua es el Riksbank sueco, de 1668; el Banco de Inglaterra nació en 1694. La Reserva Federal de Estados Unidos se creó en 1913, después del pánico bancario de 1907.",
          "Su herramienta principal es la tasa de interés. Si la sube, pedir crédito se encarece, el consumo y la inversión bajan y la inflación se frena; el costo es menos crecimiento y más desempleo. Si la baja, abarata el crédito y estimula la actividad, con el riesgo de recalentar precios. Es un freno y un acelerador, y siempre se acciona con retraso.",
          "Cuando la tasa ya está cerca de cero y la economía sigue débil, queda la compra de bonos: el banco central crea dinero y compra deuda, inyectando liquidez. Se llama expansión cuantitativa y se usó a gran escala después de 2008 y otra vez en 2020. Hincha los balances de los bancos centrales y empuja a los inversores hacia activos más riesgosos.",
          "Los mandatos difieren. El Banco Central Europeo apunta a una inflación cercana al 2 %. La Fed tiene doble mandato: estabilidad de precios y máximo empleo. Esa diferencia explica por qué a veces actúan en momentos distintos."
        ],
        quiz: [
          { q: "¿Cuándo se creó la Reserva Federal?", o: ["1694", "1913", "1944", "1971"], a: 1,
            e: "En 1913, tras la crisis bancaria de 1907." },
          { q: "¿Qué es la expansión cuantitativa?", o: ["Subir impuestos", "Comprar bonos creando dinero", "Devaluar la moneda", "Emitir acciones"], a: 1,
            e: "El banco central crea reservas y compra deuda para inyectar liquidez cuando la tasa ya no alcanza." },
          { q: "¿Cuál es el mandato del BCE?", o: ["Máximo empleo", "Inflación cerca del 2 %", "Equilibrar el presupuesto", "Fijar el tipo de cambio"], a: 1,
            e: "El BCE prioriza la estabilidad de precios; la Fed tiene doble mandato." }
        ]
      },
      {
        id: "e4",
        img: "images/e4.webp",
        titulo: "Deuda: la cuenta que siempre llega",
        min: 5,
        texto: [
          "Cuando un Estado gasta más de lo que recauda, emite deuda: bonos que compradores —bancos, fondos, otros países— adquieren a cambio de un interés. La relación deuda/PIB compara lo que debe con lo que produce la economía en un año. Japón supera el 250 %, Estados Unidos ronda el 120 % y Alemania el 63 %.",
          "Una deuda alta no es automáticamente una crisis. Lo que importa es la tasa, la moneda y el plazo. Si debes en tu propia moneda y a plazos largos, puedes refinanciar; si debes en dólares y a corto plazo, cualquier susto de mercado te obliga a pagar caro o a incumplir.",
          "Un impago de deuda es la cesación de pagos. Argentina entró en impago de deuda en 2001, en 2014 y en 2020; Grecia evitó el suyo en 2012 con una quita que perdió a los acreedores más de la mitad de su valor. Las consecuencias son duras: cierre del crédito, caída de la moneda, recesión y años de negociación.",
          "La deuda privada también importa. La crisis de 2008 nació de hipotecas empaquetadas y apalancamiento bancario, no de la deuda pública. Cuando el sector privado se endeuda para comprar activos cuyo precio sube, el ciclo se retroalimenta hasta que se detiene."
        ],
        quiz: [
          { q: "¿Qué mide la relación deuda/PIB?", o: ["El déficit anual", "La deuda frente a la producción anual", "El interés pagado", "Las reservas del banco central"], a: 1,
            e: "Compara el stock de deuda con el tamaño de la economía en un año." },
          { q: "¿Qué es un impago de deuda?", o: ["Una devaluación", "La cesación de pagos de la deuda", "Un impuesto", "Una quita voluntaria"], a: 1,
            e: "El deudor no puede o no quiere pagar en los términos acordados." },
          { q: "¿Por qué importa la moneda en que se emite la deuda?", o: ["No importa", "Porque en moneda propia puedes refinanciar", "Porque siempre es más barato en dólares", "Porque evita el impago de deuda"], a: 1,
            e: "Deber en moneda propia permite emitir para pagar; en moneda extranjera, no." }
        ]
      }
    ]
  },

  {
    id: "geopolitica",
    portada: "images/g4.webp",
    tema: "Geopolítica",
    titulo: "El mundo desde 1945",
    sub: "Guerra Fría · petróleo · China · hoy",
    desc: "Cómo se repartió el poder después de la guerra y por qué ese mapa todavía se mueve.",
    lecciones: [
      {
        id: "g1",
        img: "images/g1.webp",
        titulo: "La Guerra Fría: un mundo en dos",
        min: 5,
        texto: [
          "En febrero de 1945, Roosevelt, Churchill y Stalin se reunieron en Yalta para diseñar el mundo de posguerra. En Potsdam, en julio, Truman ya estaba en lugar de Roosevelt. Alemania quedó dividida en cuatro zonas, y Europa en dos esferas. La ONU nació ese año con un Consejo de Seguridad de cinco miembros permanentes con veto.",
          "El diplomático George Kennan formuló en 1947 la doctrina de la contención: no había que invadir la URSS, había que impedir la expansión de su influencia. De ahí salió el Plan Marshall, la OTAN en 1949 y, en respuesta, el Pacto de Varsovia en 1955. Nunca se enfrentaron directamente; se enfrentaron por interpósitas personas.",
          "Los momentos de máximo riesgo: el bloqueo de Berlín en 1948-49, la guerra de Corea entre 1950 y 1953, la crisis de los misiles en Cuba en 1962 y Vietnam. En 1962, durante trece días, el mundo estuvo cerca de una guerra nuclear; la salida fue retirar misiles de Turquía e Italia a cambio de los de Cuba.",
          "Después vino la distensión de los setenta, luego un nuevo pico con los euromisiles, y el final con Gorbachov. La Guerra Fría terminó sin guerra directa, algo casi sin precedentes entre dos potencias de ese tamaño."
        ],
        quiz: [
          { q: "¿En qué año se fundó la OTAN?", o: ["1945", "1947", "1949", "1955"], a: 2,
            e: "1949. El Pacto de Varsovia llegó en 1955 como respuesta." },
          { q: "¿Qué proponía la doctrina de la contención?", o: ["Invadir la URSS", "Frenar la expansión soviética", "Desarmarse", "Repartir Alemania"], a: 1,
            e: "Kennan propuso contener la influencia soviética sin guerra directa." },
          { q: "¿Qué crisis llevó al mundo al borde de una guerra nuclear en 1962?", o: ["Berlín", "Corea", "Cuba", "Vietnam"], a: 2,
            e: "La instalación de misiles soviéticos en Cuba y el bloqueo estadounidense." }
        ]
      },
      {
        id: "g2",
        img: "images/g2.webp",
        titulo: "El petróleo como arma",
        min: 5,
        texto: [
          "En 1953, el primer ministro iraní Mohammad Mosaddeq nacionalizó la industria petrolera. Reino Unido y Estados Unidos organizaron un golpe que lo derrocó y colocó al sah. El episodio se recuerda en Irán como el origen de décadas de desconfianza, y muestra la lógica del recurso: quien lo controla, negocia desde otra posición.",
          "La OPEP se fundó en 1960 en Bagdad, con Venezuela entre los socios fundadores, para defender los precios frente a las grandes petroleras. En octubre de 1973, durante la guerra de Yom Kipur, los países árabes decretaron un embargo contra Estados Unidos y Países Bajos. El precio del barril se multiplicó por cuatro en meses. Fue el primer choque petrolero y cambió la economía en conjunto mundial: inflación y desempleo al mismo tiempo, algo que los manuales no preveían.",
          "En 1979 la revolución iraní provocó el segundo choque. Luego vino la contracción de los ochenta y el desplome de precios de 1986, que contribuyó al colapso soviético: Moscú dependía de sus exportaciones de crudo.",
          "En 1990 Irak invadió Kuwait y una coalición liderada por Estados Unidos lo expulsó en 1991. Desde entonces, la seguridad del Golfo es un eje de la política exterior de las grandes potencias, y el precio del petróleo sigue siendo un impuesto mundial que se paga en cada factura."
        ],
        quiz: [
          { q: "¿Qué país fue golpeado en 1953 tras nacionalizar su petróleo?", o: ["Irak", "Irán", "Libia", "Venezuela"], a: 1,
            e: "El golpe contra Mosaddeq, organizado por la CIA y el MI6, reinstaló al sah." },
          { q: "¿Qué provocó el embargo petrolero de 1973?", o: ["La guerra de Yom Kipur", "La revolución iraní", "La invasión de Kuwait", "La caída del muro"], a: 0,
            e: "Los países árabes castigaron a los aliados de Israel; el barril se cuadruplicó." },
          { q: "¿Cuándo se fundó la OPEP?", o: ["1953", "1960", "1973", "1979"], a: 1,
            e: "En 1960 en Bagdad, con Venezuela, Arabia Saudita, Irán, Irak y Kuwait entre los fundadores." }
        ]
      },
      {
        id: "g3",
        img: "images/g3.webp",
        titulo: "China: cuarenta años de crecimiento",
        min: 5,
        texto: [
          "En 1978, dos años después de la muerte de Mao, Deng Xiaoping lanzó las reformas. El campo pasó al sistema de responsabilidad familiar: el campesino entregaba una cuota al Estado y vendía el excedente. Se abrieron zonas económicas especiales, la primera en Shenzhen, con incentivos para la inversión extranjera. El Partido mantuvo el control político y soltó la economía.",
          "El resultado fue el mayor crecimiento sostenido de la historia moderna: alrededor del 10 % anual durante tres décadas. El Banco Mundial calcula que unos 800 millones de personas salieron de la pobreza extrema. China se convirtió en la fábrica del mundo y en el primer socio comercial de más de cien países.",
          "En 2001 entró a la Organización Mundial del Comercio, lo que le abrió los mercados occidentales sin impuestos de importación altos. En 2013 lanzó la Franja y la Ruta, una red de infraestructura y financiamiento que va de Asia a África y Europa, y que también es una herramienta de influencia.",
          "Desde 2018 la relación con Estados Unidos se tensó: impuestos de importación, prohibiciones a Huawei, controles a la exportación de semiconductores. La competencia ya no es solo comercial, es tecnológica y militar. Taiwán, con TSMC produciendo la mayoría de los chips avanzados del mundo, es el punto más peligroso de esa disputa."
        ],
        quiz: [
          { q: "¿Quién lanzó las reformas económicas de 1978?", o: ["Mao Zedong", "Deng Xiaoping", "Xi Jinping", "Zhou Enlai"], a: 1,
            e: "Deng abrió la economía sin ceder el control político del Partido." },
          { q: "¿Qué papel tuvo la OMC en 2001?", o: ["Aisló a China", "Le abrió los mercados globales", "Prohibió sus exportaciones", "Creó el yuan"], a: 1,
            e: "La entrada a la OMC facilitó el acceso sin impuestos de importación altos a mercados occidentales." },
          { q: "¿Por qué Taiwán es clave en la disputa tecnológica?", o: ["Por su petróleo", "Por TSMC y los chips avanzados", "Por su ejército", "Por su población"], a: 1,
            e: "TSMC fabrica la mayor parte de los semiconductores de vanguardia del mundo." }
        ]
      },
      {
        id: "g4",
        img: "images/g4.webp",
        titulo: "El mapa que se está redibujando",
        min: 5,
        texto: [
          "En febrero de 2022 Rusia invadió Ucrania a gran escala. La respuesta occidental fue financiera más que militar: sanciones al banco central, exclusión de bancos del sistema SWIFT y congelamiento de unos 300.000 millones de dólares en reservas rusas. Fue la primera vez que se inmovilizaban reservas de un país de ese tamaño, y muchos gobiernos tomaron nota: guardar ahorro en dólares ya no parece neutral.",
          "De ahí salió un impulso, todavía parcial, por comerciar en monedas nacionales. China y Brasil, India y Rusia, Arabia Saudita y China han hecho partes de su comercio en yuanes o rupias. No es el fin del dólar —sigue siendo la moneda de reserva y de los mercados de deuda—, pero es el fin de su monopolio incuestionado.",
          "El grupo BRICS, creado en 2009 por Brasil, Rusia, India y China, sumó a Sudáfrica en 2010 y se amplió en 2024 con Egipto, Etiopía, Irán y Emiratos Árabes Unidos. No es una alianza militar ni un bloque homogéneo: es una plataforma para negociar un orden menos centrado en Occidente.",
          "La otra fractura es tecnológica. Estados Unidos restringe la venta de chips y equipos de litografía a China; China responde con inversión estatal y controles sobre minerales críticos. Las cadenas de suministro se acortan y se politizan. El mundo de 2026 no es bipolar como el de 1962 ni unipolar como el de 1995: es un tablero con varios centros y reglas en disputa."
        ],
        quiz: [
          { q: "¿Qué medida occidental de 2022 fue inédita por su escala?", o: ["El envío de tropas", "El congelamiento de reservas rusas", "El cierre del espacio aéreo", "La salida de la ONU"], a: 1,
            e: "Unos 300.000 millones de dólares en reservas quedaron inmovilizados, algo sin precedente." },
          { q: "¿Qué es el BRICS?", o: ["Una alianza militar", "Un grupo de economías emergentes", "Un banco central", "Un tratado comercial de Occidente"], a: 1,
            e: "Brasil, Rusia, India, China y Sudáfrica, ampliado en 2024; no es un bloque militar." },
          { q: "¿Qué industria está en el centro de la disputa EE. UU.-China?", o: ["La textil", "Los semiconductores", "La agrícola", "La automotriz"], a: 1,
            e: "Los chips y las máquinas de litografía son el cuello de botella tecnológico." }
        ]
      }
    ]
  }
];
