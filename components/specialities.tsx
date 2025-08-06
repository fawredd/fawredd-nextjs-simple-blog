import { mainSpecialities } from "@/lib/config"

export default async function Specialities(){
    return (
        <>
        {/* Specialties Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-green-600 mb-6">
            ESPECIALIDADES
          </h2>

          <div className="space-y-6">
            {mainSpecialities.map((specialty, index) => (
              <div
                key={`especialidad${index}`}
                className="border-l-4 border-green-600 pl-4"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {specialty.title}
                </h3>
                {specialty.description && (
                  <p className="text-gray-600 text-sm">
                    {specialty.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
        </>
    )
}