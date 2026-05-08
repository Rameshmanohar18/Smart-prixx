import TrendingHeroSection from "../components/home/TrendingHeroSection"
import CategoryIconsRow from "../components/home/CategoryIconsRow"
import LatestNewsSection from "../components/home/LatestNewsSection"
import PopularMobilesSection from "../components/home/PopularMobilesSection"
import TrendingNewsSection from "../components/home/TrendingNewsSection"
import UpcomingMobilesSection from "../components/home/UpcomingMobilesSection"
import ReviewsSection from "../components/home/ReviewsSection"
import ComparisonsSection from "../components/home/ComparisonsSection"
import NewMobilesSection from "../components/home/NewMobilesSection"
import PopularProductsSection from "../components/home/PopularProductsSection"
import RightSidebar from "../components/home/RightSidebar"

export default function Home() {
  return (
    <div style={{background:"#f0f0f0", minHeight:"100vh"}}>
      <div style={{maxWidth:"1060px", margin:"0 auto"}}>
        <TrendingHeroSection />
      </div>
      <CategoryIconsRow />
      <div style={{maxWidth:"1060px", margin:"0 auto", padding:"8px 12px 24px"}}>
        <div style={{display:"flex", gap:"12px", alignItems:"flex-start"}}>
          <main style={{flex:1, minWidth:0}}>
            <LatestNewsSection />
            <PopularMobilesSection />
            <TrendingNewsSection />
            <UpcomingMobilesSection />
            <ReviewsSection />
            <ComparisonsSection />
            <NewMobilesSection />
            <PopularProductsSection />
          </main>
          <RightSidebar />
        </div>
      </div>
    </div>
  )
}