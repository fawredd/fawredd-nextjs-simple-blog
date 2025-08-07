"use client";
import { MultiSelect } from "./multi-select";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import GetTagsList from "@/actions/BlogActions";
import { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";

interface ChildProps {
  selectedValues: string[];
  setSelectedValues: Dispatch<SetStateAction<string[]>>;
}
export default function TagSelector({
  selectedValues,
  setSelectedValues,
}: ChildProps) {
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<{ value: string; label: string }[]>([]);
  const [newTag, setNewTag] = useState('')
  const tagId = useRef(0)
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await GetTagsList();
        const tagSlugArray = data.map((tag) => {
          return { value: `${tag.id}`, label: tag.name };
        });
        setTags(tagSlugArray);
        setLoading(false);
      } catch (e) {
        console.log(`Error fetching tags. ${e}`);
        toast(`Error fetching tags. ${e}`);
      }
    };
    fetchData();
  }, []);
  const handleNewTagButtonClick = (e: React.MouseEvent<HTMLButtonElement>)=>{
    setTags((prev)=>[...prev,{value:`${tagId.current--}`, label: newTag}])
    setNewTag('')
    // Tengo que seleccionar los tags nuevos y agregarlos
    
  }
  const handleNewTagChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
    setNewTag(e.currentTarget.value)
  }
  return (
    <>
      {loading ? (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p>Cargando...</p>
          </div>
        </div>
      ) : (
        <MultiSelect
          options={tags}
          onValueChange={setSelectedValues}
          defaultValue={selectedValues}
          responsive={true}
          	emptyIndicator={
              <>
                <input type='text' name='newTag' placeholder='new tag' className='border' onChange={handleNewTagChange} value={newTag} />
                <Button onClick={handleNewTagButtonClick}>Add</Button>
              </>
            }
        />
      )}
    </>
  );
}
