import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";
import video480p from "@/assets/480p.mp4"
import logoSq from "@/assets/dmisLogoSq.png"
import { useForm } from "@tanstack/react-form";
import { LoginDefaultValues, LoginSchema } from "@/hooks/forms/login/schema";
import { zodValidator } from "@tanstack/zod-form-adapter";

export const LoginIndex = () => {
  const { t } = useTranslation("", { keyPrefix: "login" });
  const { t: tValidation } = useTranslation("", { keyPrefix: "validation" });

  const form = useForm({
    defaultValues: LoginDefaultValues,
    onSubmit: async ({ value }) => {
      console.log(value);
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: LoginSchema,
    },
  });
  return (
    <div className="relative">
      <video
        autoPlay
        loop
        muted
        className="absolute object-cover z-0 blur-sm w-screen min-w-full min-h-full max-w-none h-screen overflow-hidden"
      >
        <source src={video480p} type="video/mp4" />
      </video>
      <div className="absolute z-10 w-screen h-screen bg-white/30 overscroll-none">
        <div className="h-screen flex justify-center items-center">
          <Card className="w-4/5 pb-8 sm:w-4/5 md:w-3/5 lg:w-2/5">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
            >
              <CardHeader className="items-center">
                <img src={logoSq} />
                <CardTitle className="text-center text-3xl"></CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                <form.Field
                  name="username"
                  children={(field) => (
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor={field.name}>{t("username")}</Label>
                      <Input
                        type="text"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder={t("placeholderUser")}
                      />
                      {field.state.meta.errors.length !== 0 && (
                        <p className="text-xs text-error">
                          {tValidation(field.state.meta.errors[0])}
                        </p>
                      )}
                    </div>
                  )}
                />
                <form.Field
                  name="password"
                  children={(field) => (
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor={field.name}>{t("password")}</Label>
                      <Input
                        type="text"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder={t("placeholderPass")}
                      />
                      {field.state.meta.errors.length !== 0 && (
                        <p className="text-xs text-error">
                          {tValidation(field.state.meta.errors[0])}
                        </p>
                      )}
                    </div>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">
                  {t("title")}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};
