
export default function Layout({ children }: { children: React.ReactNode }) {

  // set default background
  let bgImage = "url('https://res.cloudinary.com/diahnvqxo/image/upload/v1689531070/wallpaper_am0ldu.jpg')";

  // set BG for player card
  // if (location.pathname.match(/^\/gm\/player\//g)) {
  //   bgImage = "url('/images/backgrounds/explosion-on-hull.jpg')";
  // }

  // set BG for newsfeed
  // if (location.pathname.match(/^\/gm\/newsfeed+/g)) {
  //   bgImage = "url('/images/backgrounds/interior-wall.png";
  // }
  //
  return (
    <div
      className="h-[1080px] w-[1920px] bg-cover"
      style={{ backgroundImage: bgImage }}
    >
      {children}
    </div>
  );
}
