//SHOULD MOVE THIS CONTENT TO DB AND GENERATE ADMIN PANEL FOR IT

export const SITE_NAME = `Etercell`
export const SITE_URL = `https://www.etercell.com`
export const SITE_DESCRIPTION = "Líderes en medicina regenerativa y terapias avanzadas."

export const brand = `Etercell`
export const blogIntro = `Mantente informado sobre las últimas innovaciones en medicina regenerativa, terapias avanzadas y casos de éxito de nuestros tratamientos.`


export const menuItems = [
  { url: "/", title: "Inicio" },
  { url: "/especialidades", title: "Especialidades" },
  { url: "/blog", title: "Blog" },
  // { url: "/contacto", title: "Contacto" },
];

export const logo = {
  image: "/assets/etercell-logo-h.png",
  alt: "Etercell Logo",
};

export const heroSection = {
  video: {
    poster: "/assets/hero-background.jpg",
    videoUrl: "/assets/IntroLow.mp4", // defined as video/mp4
  },
  message: {
    imageUrl: "/assets/etercell-logo-nuevo.png",
    imageAlt: "Etercell Logo",
    text: `Líderes en brindar soluciones innovadoras para restaurar y mejorar tejidos dañados. Nos centramos en medicina regenerativa, ofreciendo nuestros servicios para las terapias y tratamientos vanguardistas que promuevan la recuperación y la regeneración de tejidos y órganos dañados.`,
  },
};

export const mainArticle = {
  title: `${brand}: Terapias avanzadas y Medicina Regenerativa para una vida mejor.`,
  subtitle: `Somos líderes en medicina regenerativa`,
  text: ``,
};

export const mainSpecialities = [
  {
    title: "TRAUMATOLOGÍA",
    description: `Solo determinados tejidos y órganos son capaces de regenerarse espontáneamente después de una enfermedad o trauma, y esta capacidad humana explora enfoques terapéuticos regenerativos para tratar diversas afecciones.`,
  },
  { title: "ESTÉTICA", description: `Resultados naturales y personalizados: Cada tratamiento se adapta a tus necesidades específicas, logrando un aspecto más joven y saludable.
Minimiza los signos del envejecimiento: Reduce arrugas, líneas de expresión y flacidez, devolviendo luminosidad y vitalidad a tu piel.
Mejora la textura y calidad de la piel: Estimula la producción de colágeno y elastina, mejorando la firmeza y elasticidad de tu piel.
Procedimientos mínimamente invasivos: La mayoría de nuestros tratamientos son ambulatorios y requieren poco tiempo de recuperación.` },
  { title: "NEUROLOGÍA", description: `Se obtiene a partir del tejido adiposo y una muestra de sangre del paciente. Se procesa en el laboratorio y da como resultado un concentrado que estimula y utiliza los factores que se encuentran en la zona lesionada, integrando las células y regenerando el tejido. No produce rechazo alguno ya que es un producto autólogo` },
  { title: "ODONTOLOGÍA", description: `
    En los últimos años, los estudios han demostrado que los tejidos bucales son una fuente de células madre. Existen múltiples factores que pueden producir reabsorción ósea alveolar debido a la extracción o pérdida dentaria por caries severas, traumatismos o fracturas radiculares o incluso por enfermedades periodontales. En pacientes edéntulos, la resorción ósea continúa durante toda la vida, especialmente en la mandíbula, lo que dificulta la sustitución de los dientes faltantes con implantes dentales…` },
];



export const specialties = [
  {
    title: "TRAUMATOLOGÍA",
    description: "Solo determinados tejidos y órganos son capaces de regenerarse espontáneamente después de una enfermedad o trauma. Esta capacidad humana explora enfoques terapéuticos regenerativos para tratar diversas afecciones.",
    applications: [
      "Lesiones deportivas",
      "Fracturas complejas",
      "Regeneración de cartílago",
      "Lesiones de ligamentos y tendones"
    ]
  },
  {
    title: "NEUROLOGÍA",
    description: "La medicina regenerativa neurológica se enfoca en la restauración de la función del sistema nervioso mediante terapias celulares avanzadas y factores de crecimiento específicos.",
    applications: [
      "Enfermedades neurodegenerativas",
      "Lesiones de médula espinal",
      "Accidentes cerebrovasculares",
      "Neuropatías periféricas"
    ]
  },
  {
    title: "ODONTOLOGÍA",
    description: "Aplicación de terapias regenerativas en odontología para la restauración de tejidos dentales, periodontales y maxilofaciales.",
    applications: [
      "Regeneración periodontal",
      "Implantología avanzada",
      "Regeneración ósea maxilar",
      "Tratamiento de ATM"
    ]
  },
  {
    title: "ESTÉTICA",
    description: "Medicina estética regenerativa que utiliza factores de crecimiento para rejuvenecimiento facial y corporal.",
    applications: [
      "Rejuvenecimiento facial",
      "Tratamiento de cicatrices",
      "Regeneración capilar",
      "Lifting no quirúrgico"
    ]
  },
]


export const footer = {
    text: `Líderes en medicina regenerativa y terapias avanzadas. Ofrecemos soluciones innovadoras 
              para restaurar y mejorar tejidos dañados.`
}

export const contactData = {
    address:{ 
        label:'',
        text:''
    },
    phone:{ 
        label:'Whatsapp:',
        text:'+5491137840587'
    },
    email:{ 
        label:'',
        text:''
    }
}

export const brandKeywords =  [
    "medicina regenerativa",
    "terapias avanzadas",
    "traumatología",
    "neurología",
    "secretomas",
    "biomedicina"
  ]