import { isPlatform } from "@ionic/react";
import { Plugins } from "@capacitor/core";
import {ConsoleLogObserver, AuthService, EndSessionRequest, Browser} from "ionic-appauth";
import {
  CapacitorBrowser,
  CapacitorSecureStorage
} from "ionic-appauth/lib/capacitor";
import { AuthorizationServiceConfiguration, StringMap, BasicQueryStringUtils } from "@openid/appauth";

import { AxiosRequestor } from "./AxiosService";
import {Requestor, StorageBackend} from "@openid/appauth";

const { App } = Plugins;
/* an example open id connect provider */
const openIdConnectUrl = "https://accounts.google.com";

/* example client configuration */
const clientIdDe =
    "837888262468-p7a2590eh7vld598n016ul350r80rtvu.apps.googleusercontent.com";
const clientId =
    "511828570984-7nmej36h9j2tebiqmpqh835naet4vci4.apps.googleusercontent.com";
const redirectUri = "http://127.0.0.1:8000";
const redirectPath = "loginredirect";
const scope = "openid email profile";
const access_type= "offline";




export interface EndSessionHandler {
  performEndSessionRequest(configuration: AuthorizationServiceConfiguration, request : EndSessionRequest): Promise<string | undefined>;
}

export class NooopEndSessionHandler implements EndSessionHandler {

  _storage:StorageBackend
  constructor(storage:StorageBackend

  ) {
    this._storage = storage;}

  public async performEndSessionRequest(configuration: AuthorizationServiceConfiguration, request : EndSessionRequest): Promise<string | undefined> {
  
    return Promise.resolve(request.postLogoutRedirectURI);
   }
 
}
class AuthServiceWithoutEndSession extends AuthService{
 constructor(...args:any) {
   super(...args);

   this.endSessionHandler=new NooopEndSessionHandler( this.storage);
   
  
 }

} 

export class Auth {
  private static authService: AuthService | undefined;

  private static buildAuthInstance() {
    const authService = new AuthServiceWithoutEndSession(
      new CapacitorBrowser(),
      new CapacitorSecureStorage(),
      new AxiosRequestor()
    );
    authService.authConfig = {
      client_id:clientIdDe,
      server_host: openIdConnectUrl,
      redirect_url: isPlatform("capacitor")
        ? "com.appauth.doth://callback"
        :   `${window.location.origin}/${redirectPath}`,
      end_session_redirect_url: isPlatform("capacitor")
        ? "com.appauth.doth://endSession" 
        : `${window.location.origin}/endredirect`,
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
