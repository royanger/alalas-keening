export const Impersonating = ({ character }: { character: string }) => {

  return (

    <div className="w-full h-16 bg-red-900 text-white flex-row items-center justify-center hidden xl:flex z-50 t-0">
      <h2 className="text-gray-200 text-2xl ">Impersonating: {character}</h2>
    </div>

  )
}
