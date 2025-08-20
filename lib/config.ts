//SHOULD MOVE THIS CONTENT TO DB AND GENERATE ADMIN PANEL FOR IT

export const brand = `Etercell`
export const blogIntro = `Mantente informado sobre las últimas innovaciones en medicina regenerativa, terapias avanzadas y casos de éxito de nuestros tratamientos.`


export const menuItems = [
  { url: "/", title: "Inicio" },
  { url: "/especialidades", title: "Especialidades" },
  { url: "/blog", title: "Blog" },
  // { url: "/contacto", title: "Contacto" },
];

export const logo = {
  image: "/assets/EterCell-Logo-H.png",
  alt: "Etercell Logo",
};

export const heroSection = {
  video: {
    poster: "/placeholder.svg",
    videoUrl: "/assets/IntroLow.mp4", // defined as video/mp4
  },
  message: {
    imageUrl: "/assets/Etercell-logo-nuevo.png",
    imageAlt: "Etercell Logo",
    text: `Líderes en brindar soluciones innovadoras para restaurar y mejorar tejidos dañados. Nos centramos en medicina regenerativa especializada en medicina regenerativa, ofreciendo nuestros servicios para las terapias y tratamientos vanguardistas que promuevan la recuperación y la regeneración de tejidos y órganos dañados.`,
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
    description: `Solo determinados tejidos y órganos son capaces de regenerarse espontáneamente después de una enfermedad o trauma, y esta capacidad humana explora enfoques terapéuticos regenerativos para tratar diversas afecciones. Las células madre mesenquimales (MSC) se derivan de células madre adultas, son multipotentes y ejercen efectos antiinflamatorios e inmunomoduladores, así.`,
  },
  { title: "NEUROLOGÍA", description: `Se obtiene a partir del tejido adiposo y una muestra de sangre del paciente. Se procesa en el laboratorio y da como resultado un concentrado que estimula y utiliza los factores que se encuentran en la zona lesionada, integrando las células y regenerando el tejido. No produce rechazo alguno ya que es un producto autólogo` },
  { title: "ODONTOLOGÍA", description: `
    En los últimos años, los estudios han demostrado que los tejidos bucales son una fuente de células madre. Existen múltiples factores que pueden producir reabsorción ósea alveolar debido a la extracción o pérdida dentaria por caries severas, traumatismos o fracturas radiculares o incluso por enfermedades periodontales. En pacientes edéntulos, la resorción ósea continúa durante toda la vida, especialmente en la mandíbula, lo que dificulta la sustitución de los dientes faltantes con implantes dentales…` },
  { title: "ESTÉTICA", description: `Resultados naturales y personalizados: Cada tratamiento se adapta a tus necesidades específicas, logrando un aspecto más joven y saludable.
Minimiza los signos del envejecimiento: Reduce arrugas, líneas de expresión y flacidez, devolviendo luminosidad y vitalidad a tu piel.
Mejora la textura y calidad de la piel: Estimula la producción de colágeno y elastina, mejorando la firmeza y elasticidad de tu piel.
Procedimientos mínimamente invasivos: La mayoría de nuestros tratamientos son ambulatorios y requieren poco tiempo de recuperación.` },
  { title: "CRIOPRESERVACIÓN", description: `
    Al combinar estas dos tecnologías, se abren nuevas y emocionantes posibilidades en diversos campos de la medicina:
<ul style='list-style: disc; padding-left: 16px;'>
<li key='crio2'>Investigación: La criopreservación facilita la investigación básica y traslacional, permitiendo el estudio de las células y tejidos en diferentes condiciones y el desarrollo de nuevas terapias.</li>
<li key='crio3'>Terapias celulares: Las células criopreservadas pueden utilizarse para generar productos biológicos y terapias celulares personalizadas para tratar una amplia gama de enfermedades, desde lesiones deportivas hasta enfermedades degenerativas.</li>
<li key='crio4'>Medicina personalizada: La combinación de la criopreservación y la medicina regenerativa permite desarrollar tratamientos personalizados, utilizando las propias células del paciente.</li>
</ul>
    ` },
  { title: "ÁREAS DE APLICACIÓN", description: ` Los ensayos clínicos basados ​​en MSC involucran una variedad de enfermedades en diferentes órganos y tejidos. Los ensayos clínicos basados ​​en MSC se aplican principalmente a enfermedades asociadas con la inflamación, la cicatrización de heridas, la infección y la degeneración en diversos órganos y tejidos. La figura muestra los tipos de enfermedades que han completado ensayos clínicos, y las enfermedades más aplicadas involucran los huesos y el sistema nervioso. Las MSC poseen una gran capacidad para equilibrar las respuestas inmunitarias, especialmente en trastornos autoinmunes, como la GvHD y la enfermedad de Crohn…
    <Link href="/blog">más</Link>`},
];



export const specialties = [
  {
    title: "TRAUMATOLOGÍA",
    description: "Solo determinados tejidos y órganos son capaces de regenerarse espontáneamente después de una enfermedad o trauma. Esta capacidad humana explora enfoques terapéuticos regenerativos para tratar diversas afecciones. Las células madre mesenquimales (MSC) se derivan de células madre adultas, son multipotentes y ejercen efectos antiinflamatorios e inmunomoduladores.",
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
    description: "Medicina estética regenerativa que utiliza células madre y factores de crecimiento para rejuvenecimiento facial y corporal.",
    applications: [
      "Rejuvenecimiento facial",
      "Tratamiento de cicatrices",
      "Regeneración capilar",
      "Lifting no quirúrgico"
    ]
  },
  {
    title: "CRIOPRESERVACIÓN",
    description: "Conservación de células madre y tejidos a temperaturas ultra bajas para su uso futuro en terapias regenerativas personalizadas.",
    applications: [
      "Preservación de células madre",
      "Banco de tejidos autólogos",
      "Medicina personalizada",
      "Terapias futuras"
    ]
  }
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
    "células madre",
    "traumatología",
    "neurología",
    "secretomas",
    "biomedicina"
  ]