export const ImageCard = ({ image }: { image: string }) => {
  if (image == 'upload')
    return (
      <input
        className='flex h-9 w-full rounded-md border border-input bg-background px-4 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
        id='picture'
        name='picture'
        type='file'
      />
    )
  if (image == 'add') return <span>+</span>
  return <img className='w-3/4 h-1/2 rounded-lg' src={image} alt='error' />
}
