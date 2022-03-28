import { ICommand } from 'wokcommands'
import Canvas from 'canvas'
import { ColorResolvable, MessageAttachment } from 'discord.js'
import { ColorCheck } from '../../helpers'

const hexToRGB = (
  hex: string
): {
  r: number
  g: number
  b: number
} => {
  let r = ''
  let g = ''
  let b = ''
  if (hex.length === 4) {
    r = '0x' + hex[1] + hex[1]
    g = '0x' + hex[2] + hex[2]
    b = '0x' + hex[3] + hex[3]
  } else {
    r = '0x' + hex[1] + hex[2]
    g = '0x' + hex[3] + hex[4]
    b = '0x' + hex[5] + hex[6]
  }
  return { r: +r, g: +g, b: +b }
}

const rgbToHSL = (
  r: number,
  g: number,
  b: number
): {
  h: number
  s: number
  l: number
} => {
  r /= 255
  g /= 255
  b /= 255
  const cmin = Math.min(r, g, b)
  const cmax = Math.max(r, g, b)
  const delta = cmax - cmin
  let h = 0
  let s = 0
  let l = 0
  if (delta === 0) h = 0
  else if (cmax === r) h = ((g - b) / delta) % 6
  else if (cmax === g) h = (b - r) / delta + 2
  else h = (r - g) / delta + 4
  h = Math.round(h * 60)
  if (h < 0) h += 360

  l = (cmax + cmin) / 2
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))
  s = +(s * 100).toFixed(2)
  l = +(l * 100).toFixed(2)

  return { h: h, s: s, l: l }
}

const rgbToCMYK = (
  r: number,
  g: number,
  b: number
): {
  c: number
  m: number
  y: number
  k: number
} => {
  let c = 0,
    m = 0,
    y = 0,
    k = 0
  if (r === 0 && g === 0 && b === 0) {
    k = 1
    return { c: 0, m: 0, y: 0, k: 1 }
  }

  c = 1 - r / 255
  m = 1 - g / 255
  y = 1 - b / 255

  var minCMY = Math.min(c, m, y)
  c = +(((c - minCMY) / (1 - minCMY)) * 100).toFixed(2)
  m = +(((m - minCMY) / (1 - minCMY)) * 100).toFixed(2)
  y = +(((y - minCMY) / (1 - minCMY)) * 100).toFixed(2)
  k = +(minCMY * 100).toFixed(2)

  return { c: c, m: m, y: y, k: k }
}

export default {
  category: 'Utility',
  description: 'Display a hex color swatch and convert to RGB, HSL, and CMYK',
  // permissions: ['ADMINISTRATOR'],
  requireRoles: false,
  slash: true,
  testOnly: false,
  guildOnly: false,
  options: [
    {
      name: 'hex',
      description: 'Hex value',
      type: 3,
      required: false,
    },
  ],

  callback: async ({ interaction }) => {
    await interaction.deferReply()
    const WIDTH = 80
    const RADIUS = 20
    let hex = interaction.options.getString('hex') as ColorResolvable
    hex = ColorCheck(hex)
    const canvas = Canvas.createCanvas(WIDTH, WIDTH)
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = hex.toString()
    ctx.beginPath()
    ctx.moveTo(0, RADIUS / 2)
    ctx.lineTo(0, WIDTH - RADIUS / 2)
    ctx.quadraticCurveTo(0, WIDTH, RADIUS / 2, WIDTH)
    ctx.lineTo(WIDTH - RADIUS / 2, WIDTH)
    ctx.quadraticCurveTo(WIDTH, WIDTH, WIDTH, WIDTH - RADIUS / 2)
    ctx.lineTo(WIDTH, RADIUS / 2)
    ctx.quadraticCurveTo(WIDTH, 0, WIDTH - RADIUS / 2, 0)
    ctx.lineTo(RADIUS / 2, 0), ctx.quadraticCurveTo(0, 0, 0, RADIUS / 2)
    ctx.closePath()
    ctx.fill()

    const { r, g, b } = hexToRGB(hex.toString())
    const { h, s, l } = rgbToHSL(r, g, b)
    const { c, m, y, k } = rgbToCMYK(r, g, b)

    const attachment = new MessageAttachment(canvas.toBuffer(), `ciri.png`)
    interaction.editReply({
      embeds: [
        {
          color: hex,
          thumbnail: { url: `attachment://ciri.png` },
          fields: [
            {
              name: 'Hex',
              value: hex.toString(),
            },
            {
              name: 'RGB',
              value: `${r}, ${g}, ${b}`,
            },
            {
              name: 'HSL',
              value: `${h}, ${s}%, ${l}%`,
            },
            {
              name: 'CMYK',
              value: `${c}%, ${m}%, ${y}%, ${k}%, `,
            },
          ],
        },
      ],
      files: [attachment],
    })
  },
} as ICommand