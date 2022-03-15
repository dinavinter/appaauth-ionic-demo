import { isPlatform } from "@ionic/react";
import { Plugins } from "@capacitor/core";
import { ConsoleLogObserver, AuthService } from "ionic-appauth";
import {
  CapacitorBrowser,
  CapacitorSecureStorage
} from "ionic-appauth/lib/capacitor";

import { AxiosRequestor } from "./AxiosService";

const { App } = Plugins;
/* an example open id connect provider */
const openIdConnectUrl = "https://accounts.google.com";

/* example client configuration */
const clientId =
    "511828570984-7nmej36h9j2tebiqmpqh835naet4vci4.apps.googleusercontent.com";
const redirectUri = "http://127.0.0.1:8000";
const scope = "openid userinfo";

export class Auth {
  private static authService: AuthService | undefined;

  private static buildAuthInstance() {
    const authService = new AuthService(
      new CapacitorBrowser(),
      new CapacitorSecureStorage(),
      new AxiosRequestor()
    );
    authService.authConfig = {
      client_id:clientId,
      server_host: openIdConnectUrl,
      redirect_url: isPlatform("capacitor")
        ? "com.appauth.demo://callback"
        : window.location.origin + "/loginredirect",
      end_session_redirect_url: isPlatform("capacitor")
        ? "com.appauth.demo://endSession"
        : window.location.origin + "/endredirect",
      scopes: scope,
      pkce: true
    };

    if (isPlatform("capacitor")) {
      console.log("applistenercreated");
      App.addListener("appUrlOpen", (data: any) => {
        console.log(data.url);
        console.log(authService.authConfig.redirect_url);
        if (data.url !== undefined) {
          authService.handleCallback(data.url);
        }
      });
    }

    authService.addActionObserver(new ConsoleLogObserver());
    return authService;
  }

  public static get Instance(): AuthService {
    if (!this.authService) {
      this.authService = this.buildAuthInstance();
    }

    return this.authService;
  }
}
