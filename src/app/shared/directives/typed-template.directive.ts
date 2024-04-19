import { Directive, Input, TemplateRef } from '@angular/core'

@Directive({ selector: 'ng-template[typedTemplate]' })
export class TypedTemplateDirective<TypeToken> {
    // how you tell the directive what the type should be
    @Input('typedTemplate')
    typeToken!: TypeToken

    // the directive gets the template from Angular
    constructor(private contentTemplate: TemplateRef<TypeToken>) {}

    // this magic is how we tell Angular the context type for this directive, which then propagates down to the type of the template
    static ngTemplateContextGuard<TypeToken>(
        dir: TypedTemplateDirective<TypeToken>,
        ctx: unknown
    ): ctx is TypeToken {
        return true
    }
}
