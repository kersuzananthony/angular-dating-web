import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from "@angular/router";
import {MemberEditComponent} from "../components/members/member-edit/member-edit.component";

@Injectable()
export class PreventUnsavedChangesGuard implements CanDeactivate<MemberEditComponent> {


  public canDeactivate(component: MemberEditComponent,
                       currentRoute: ActivatedRouteSnapshot,
                       currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean {
    if (component.editForm.dirty) {
      return confirm("Are you sure to leave the page? All changes will be lost. Continue?");
    }

    return true;
  }
}

