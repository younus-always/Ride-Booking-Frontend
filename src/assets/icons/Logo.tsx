import { Link } from "react-router"
import LogoImg from './logo.svg';

const Logo = () => {
      return (
            <>
                  <Link to="/" className="flex items-center justify-start gap-3">
                        <img src={LogoImg} alt="logo" className="w-12 h-12" />
                        <span
                              className="text-xl font-bold bg-linear-to-r from-[oklch(0.646_0.222_41.116)] via-[oklch(0.75_0.183_55.934)] to-[oklch(0.837_0.128_66.29)] bg-clip-text text-transparent"
                        >
                              Ridek
                        </span>


                  </Link>
            </>
      )
}

export default Logo