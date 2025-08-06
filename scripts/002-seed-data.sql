-- Insert default admin user
INSERT INTO users (email, name, password_hash, role, created_at, updated_at)
VALUES (
    'test@test.com',
    'Admin User',
    '$2a$12$h7V7TqCY4785/ZLh9ojwruJquDEnMQNVrsrqf/tVCz5CxFaT7z.Bi', -- password: admin123
    'admin',
    NOW(),
    NOW()
) ON CONFLICT (email) DO UPDATE SET
    name = EXCLUDED.name,
    password_hash = '$2a$12$h7V7TqCY4785/ZLh9ojwruJquDEnMQNVrsrqf/tVCz5CxFaT7z.Bi', -- password: admin123
    role = EXCLUDED.role,
    updated_at = EXCLUDED.updated_at;

-- Insert sample categories
INSERT INTO categories (name, slug, description, created_at) VALUES
('Medicina Regenerativa', 'medicina-regenerativa', 'Artículos sobre medicina regenerativa y terapias avanzadas', NOW()),
('Traumatología', 'traumatologia', 'Contenido relacionado con traumatología y lesiones', NOW()),
('Estética', 'estetica', 'Medicina estética y tratamientos de belleza', NOW()),
('Neurología', 'neurologia', 'Artículos sobre neurología y sistema nervioso', NOW())
ON CONFLICT (slug) DO NOTHING;

-- Insert sample tags
INSERT INTO tags (name, slug, created_at) VALUES
('células madre', 'celulas-madre', NOW()),
('terapia celular', 'terapia-celular', NOW()),
('traumatología', 'traumatologia', NOW()),
('medicina estética', 'medicina-estetica', NOW()),
('regeneración', 'regeneracion', NOW()),
('tratamiento', 'tratamiento', NOW()),
('innovación', 'innovacion', NOW()),
('salud', 'salud', NOW())
ON CONFLICT (slug) DO NOTHING;

-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, content, excerpt, published, author_id, featured_image, created_at, updated_at)
SELECT 
    'La Revolución Silenciosa de los Secretomas: Un Puente entre la Traumatología, la Salud Capilar y la Medicina Estética',
    'revolucion-silenciosa-secretomas',
    '<p>En el vertiginoso campo de la medicina regenerativa y la bioestética, un concepto está generando protagonismo por su versatilidad terapéutica: los <strong>secretomas</strong>. Este conjunto de moléculas bioactivas que las células liberan al medio extracelular, se está posicionando como una herramienta revolucionaria que trasciende desde la traumatología y la regeneración capilar hasta la medicina estética.</p>

<h2>¿Qué son exactamente los secretomas?</h2>

<p>Para, qué son exactamente los secretomas y por qué están captando la atención de tantos especialistas que se centran en el tratamiento de células madre, se enfoque en secretomas se basa en utilizar el poder de factores de crecimiento, citoquinas, exosomas, microRNAs y otras moléculas bioactivas que las células madre y otras células especializadas liberan de forma natural. Estas moléculas actúan como mensajeros celulares, promoviendo la formación de nuevos vasos sanguíneos (angiogénesis) y estimulando la proliferación y diferenciación celular.</p>

<h2>Aplicaciones en Traumatología: Acelerando la Curación de Huesos, Cartílagos y Músculos</h2>

<p>En el ámbito de la traumatología, los secretomas de células madre presentan grandes beneficios para el tratamiento de lesiones que hasta ahora presentaban grandes desafíos para los médicos especialistas en traumatología y la regeneración capilar hasta la medicina estética.</p>',
    'Descubre cómo los secretomas están revolucionando la medicina regenerativa, desde la traumatología hasta la medicina estética, ofreciendo nuevas esperanzas para tratamientos innovadores.',
    true,
    (SELECT id FROM users WHERE email = 'admin@etercell.com' LIMIT 1),
    '/placeholder.svg?height=400&width=600',
    NOW(),
    NOW()
WHERE EXISTS (SELECT 1 FROM users WHERE email = 'admin@etercell.com');

INSERT INTO blog_posts (title, slug, content, excerpt, published, author_id, featured_image, created_at, updated_at)
SELECT 
    'Terapias Avanzadas en Medicina Regenerativa: El Futuro de la Salud',
    'terapias-avanzadas-medicina-regenerativa',
    '<p>La medicina regenerativa representa uno de los campos más prometedores de la medicina moderna. Con el desarrollo de nuevas tecnologías y técnicas, estamos presenciando una revolución en el tratamiento de enfermedades y lesiones que antes se consideraban incurables.</p>

<h2>¿Qué es la Medicina Regenerativa?</h2>

<p>La medicina regenerativa es un campo interdisciplinario que aplica principios de ingeniería y ciencias de la vida para desarrollar sustitutos biológicos que restauren, mantengan o mejoren la función de tejidos y órganos.</p>

<h2>Principales Aplicaciones</h2>

<ul>
<li><strong>Terapia Celular:</strong> Uso de células madre para regenerar tejidos dañados</li>
<li><strong>Ingeniería de Tejidos:</strong> Creación de tejidos artificiales en laboratorio</li>
<li><strong>Medicina Personalizada:</strong> Tratamientos adaptados al perfil genético del paciente</li>
</ul>

<p>Estas terapias ofrecen esperanza para millones de pacientes que sufren de enfermedades degenerativas, lesiones traumáticas y trastornos genéticos.</p>',
    'Explora las últimas innovaciones en medicina regenerativa y cómo estas terapias avanzadas están transformando el panorama médico actual.',
    true,
    (SELECT id FROM users WHERE email = 'admin@etercell.com' LIMIT 1),
    '/placeholder.svg?height=400&width=600',
    NOW(),
    NOW()
WHERE EXISTS (SELECT 1 FROM users WHERE email = 'admin@etercell.com');
