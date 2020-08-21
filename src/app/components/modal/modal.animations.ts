import { animate, animation, group, keyframes, style } from '@angular/animations';

export const slideInRight = animation([
  animate(
    '0.5s ease-in-out',
    keyframes([
      style({ transform: 'translateX({{ startTranslateX }})', offset: 0 }),
      style({ transform: 'translateX({{ endTranslateX }}', offset: 1 })
    ]))
]);

export const slideOutRight = animation([
  group([
    animate(
      '0.5s ease',
      keyframes([
        style({
          transform: 'translateX({{ startTranslateX }})',
          offset: 0
        }),
        style({
          transform: 'translateX({{ endTranslateX }})',
          offset: 0.9
        }),
      ])
    ),
    animate(
      '1s ease',
      keyframes([
        style({
          height: '*',
          marginBottom: '*',
          offset: 0
        }),
        style({
          height: 0,
          marginBottom: 0,
          offset: 1
        })
      ])
    )
  ])
]);
