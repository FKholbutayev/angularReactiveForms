import { Component, Input, forwardRef } from '@angular/core'; 
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const COUNTER_CONTROL_ACCESSOR = {
    provide:NG_VALUE_ACCESSOR, 
    useExisting:forwardRef(() => StockCounterComponent), 
    multi:true
}

@Component({
    selector:'stock-counter', 
    providers: [COUNTER_CONTROL_ACCESSOR],
    styleUrls:['stock-counter.component.scss'], 
    template: `
        <div class="stock-counter"
            [class.focused] = "focus">
            <div>
            <div 
            tabindex="0"
            (keydown)="onKeyDown($event)"
            (blur)="onBlur($event)"
            (focus)="onFocus($event)">
                <p> {{value}}</p>
                    <div>
                        <button type="button" 
                        (click) ="increment()"
                        [disabled]="value === max">
                          +
                        </button>
                        <button type="button" 
                        (click) ="decrement()"
                        [disabled]="value === min">
                          -
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `
})

export class StockCounterComponent implements ControlValueAccessor {
    private onTounch:Function
    private onModelChange:Function
    writeValue(value: any): void {
        this.value = value || 0
    }
    registerOnChange(fn: any): void {
        this.onModelChange = fn
    }
    registerOnTouched(fn: any): void {
        this.onTounch = fn
    }
    
    @Input() step:number = 10; 
    @Input() min:number = 10; 
    @Input() max:number = 1000; 
    
    value:number = 10; 
    focus:boolean; 
    onKeyDown(event:KeyboardEvent) {
        const handlers = {
            ArrowDown: () => this.decrement(),
            ArrowUp: () => this.increment()
        }; 

        if(handlers[event.code]) {
            handlers[event.code](); 
            event.preventDefault(); 
            event.stopPropagation();
        }

        this.onTounch()
    }
    onBlur(event:FocusEvent) {
     this.focus = false;  
        event.preventDefault(); 
        event.stopPropagation();
        this.onTounch();
    }

    onFocus(event:FocusEvent) {
     this.focus = true; 
        event.preventDefault(); 
        event.stopPropagation();
        this.onTounch();
    }

    increment() {
        if(this.value<this.max) {
            this.value = this.value + this.step;
            this.onModelChange(this.value)
        }
        this.onTounch()
    }
   
    decrement() {
        if(this.value>this.min) {
            this.value = this.value-this.step
            this.onModelChange(this.value)
        }
        this.onTounch()
    }
}