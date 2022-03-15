module.exports = {
  content: [ 
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
        keyframes: {
          'wiggle': {
            "0%, 100%": { transform: "rotate(-3deg)" },
            "50%": { transform: "rotate(3deg)" }
          },
          'flip': {
            from:{
              transform: 'rotateX(270deg)'
             },
            to:{
              transform: 'rotateX(360deg)'
             }
          },
          'shake': {
            "10%, 90%": {
              transform: "translate3d(-1px, 0, 0)"
            },
            
            "20%, 80%": {
              transform: "translate3d(2px, 0, 0)"
            },
          
           "30%, 50%, 70%": {
              transform: "translate3d(-4px, 0, 0)"
            },
          
            "40%, 60%": {
              transform: "translate3d(4px, 0, 0)"
            },
          }
        },
        animation: {
        wiggle: "wiggle 2s ease-in-out infinite",
        'flip': 'flip 1s ease-in-out',
        'shake': 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both'
      }
    },
  },
  plugins: [],
}

