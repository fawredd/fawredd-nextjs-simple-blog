'use client'
import generateBlogPost from '@/actions/generate-post-content'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default  function AIgeneratedPost() {
    const [textSearch, setTextSearch] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e:React.MouseEvent<HTMLButtonElement>) => {
      
      e.preventDefault()
      if (textSearch.length <10 || isLoading ){
        toast("La búsqueda debe tener al menos 10 caracteres.")
        return
      } 
      setIsLoading(true)
      try{
        const newAIslug = await generateBlogPost(textSearch)
        if (typeof newAIslug === "object" && newAIslug.error) {
          console.error('Error generating post:', newAIslug.error)  
          toast.error('Inconveniente generando la busqueda. Por favor intente nuevamente.')
        }
        setTimeout(()=>setIsLoading(false),5000)
        router.push(`/blog/${newAIslug}`)
      } catch(e){
        console.error('Error searching.', e)
        toast.error('Inconveniente generando la busqueda. Por favor intente nuevamente.')
        setTimeout(()=>setIsLoading(false),5000)
      }
    }


    return (
      <div className='flex flex-col md:flex-row items-start md:items-center gap-2 my-8 bg-green-600 text-white rounded-lg p-6'>
      <Label htmlFor="search" className="text-base">Buscar:</Label>
        <Input disabled={isLoading} type="search" name="search" value={textSearch} onChange={(e) => setTextSearch(e.target.value)} placeholder="Que es la medicina regenerativa?"  className="flex-grow bg-white text-black"/>

        {isLoading? 
          <Button size="default" className="bg-transparent border" disabled><div className="animate-spin rounded-full border-b-2 h-4 w-4 border-white mx-auto "></div></Button>
          :
          <Button type="submit" className="bg-transparent border " onClick={handleSubmit} disabled={isLoading} size="default">
            <span className="text-white">Buscar</span>
          </Button>
        }
    </div>
    )

}