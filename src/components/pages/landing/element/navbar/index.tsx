import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/language";
import { useTranslation } from "react-i18next";
import { FaGlobe } from "react-icons/fa6";

export const NavbarLanding = () => {
  const { t } = useTranslation("", { keyPrefix: "navbar" });
  const { language, toggleLanguage } = useLanguage();

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-screen-xl px-4 h-16 flex flex-row justify-between items-center">
        <div>1</div>
        <div className="flex gap-2">
          <Button>{t("loginBtn")}</Button>
          <Button
            variant="outline"
            className="gap-2 text-slate-700 border-0 shadow-none"
            onClick={toggleLanguage}
          >
            {language.toUpperCase()}
            <FaGlobe />
          </Button>
        </div>
      </div>
    </div>
  );
};
