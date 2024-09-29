export const ImageCard = ({ image }: { image: {src: string, name: string} }) => {
  return <>
    <img className='w-3/4 h-1/2 rounded-lg' src={image.src} alt='error' />
    <div>{image.name}</div>
  </>
}
