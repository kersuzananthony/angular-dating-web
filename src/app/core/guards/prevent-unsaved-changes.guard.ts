import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from "@angular/router";
import {IEditableComponent} from "@app/shared/components/editable.component";

@Injectable()
export class PreventUnsavedChangesGuard implements CanDeactivate<IEditableComponent> {


  public canDeactivate(component: IEditableComponent,
                       currentRoute: ActivatedRouteSnapshot,
                       currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean {
    if (component.form.dirty) {
      return confirm("Are you sure to leave the page? All changes will be lost. Continue?");
    }

    return true;
  }
}

