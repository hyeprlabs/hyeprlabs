import { AppHero } from "@/components/app/hero"
import { DashboardOverview } from "@/components/app/dashboard/overview"
import { DashboardQuickActions } from "@/components/app/dashboard/quick-actions"
import { Footer } from "@/components/marketing/footer"

export default function Page() {
  return (
    <>
      <AppHero mode="dashboard" />
      <DashboardOverview />
      <DashboardQuickActions />
      <Footer />
    </>
  )
}
