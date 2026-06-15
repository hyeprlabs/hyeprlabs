import { AppHero } from "@/components/app/hero"
import { ProfileAvatarEdit } from "@/components/app/profile/avatar-edit"
import { ProfileEditName } from "@/components/app/profile/edit-name"
import { ProfileEmails } from "@/components/app/profile/emails"
import { ProfileConnectedAccounts } from "@/components/app/profile/connected-accounts"
import { ProfileAccountInfo } from "@/components/app/profile/account-info"
import { ProfileDeleteAccount } from "@/components/app/profile/delete-account"
import { Footer } from "@/components/marketing/footer"

export default function Page() {
  return (
    <>
      <AppHero mode="profile" />
      <ProfileAvatarEdit />
      <ProfileEditName />
      <ProfileEmails />
      <ProfileConnectedAccounts />
      <ProfileAccountInfo />
      <ProfileDeleteAccount />
      <Footer />
    </>
  )
}
