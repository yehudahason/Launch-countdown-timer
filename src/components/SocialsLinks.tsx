export default function SocialsLinks() {
  const baseUrl = import.meta.env.BASE_URL;
  return (
    <ul aria-label="Socials Links" className="z-1000 flex gap-5 ">
      <li>
        <img
          className="fr"
          src={`${baseUrl}icons/icon-facebook.svg`}
          alt="Go to Facebook"
        />
      </li>
      <li>
        <img
          className="fr"
          src={`${baseUrl}icons/icon-instagram.svg`}
          alt="Go to Instagram"
        />
      </li>
      <li>
        <img
          className="fr"
          src={`${baseUrl}icons/icon-pinterest.svg`}
          alt="Go to Pinterest"
        />
      </li>
    </ul>
  );
}
