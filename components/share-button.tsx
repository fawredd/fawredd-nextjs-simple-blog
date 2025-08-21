'use client';

import { Button } from "@/components/ui/button"
import {toast} from 'sonner'


const ShareButton = ({ title, text, url }:{ title?: string, text?: string, url?: string }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title || 'Articlulo',
          text: text || 'Mira este post!',
          url: url || window.location.href,
        });
        toast.success('Contenido compartido');
      } catch (error) {
        console.error('Error sharing content:', error);
        toast.error('Error compartiendo contenido:');
      }
    } else {
      console.log('Web Share API is not supported.');
      alert('Your browser does not support the Web Share API.');
    }
  };

  return (
    <Button 
      className="bg-green-600 hover:bg-green-700 text-white" 
      onClick={handleShare}
    >
      Compartir Artículo
    </Button>
  );
};

export default ShareButton;