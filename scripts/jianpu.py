#!/usr/bin/env python3

import os
import requests
import simplejson as json
import subprocess


def pull_svg(source: str, output: str):
  font = 'PingFang SC, Microsoft YaHei, STHeiti, Open Sans, sans-serif'
  config = {
      'page': 'A5',
      'margin_top': '16',
      'margin_bottom': '16',
      'margin_left': '16',
      'margin_right': '16',
      'biaoti_font': font,
      'shuzi_font': 'b',
      'geci_font': font,
      'height_quci': '13',
      'height_cici': '10',
      'height_ciqu': '40',
      'height_shengbu': '0',
      'biaoti_size': '42',
      'fubiaoti_size': '24',
      'geci_size': '24',
      'body_margin_top': '40',
      'lianyinxian_type': '0'
  }
  data = {
      'code': source.replace('\n', '&hh&'),
      'customCode': '&hh&&hh&[fenye]',
      'pageConfig': json.dumps(config)
  }
  url = 'http://zhipu.lezhi99.com/Zhipu-draw'
  res = requests.post(url, data=data)
  if res.ok:
    content = res.content.replace(b'[fenye]', b'')
    content = content.replace(b'1193', b'630')
    with open(output, 'wb') as svg:
      svg.write(content)


def optimize_svg(svg: str):
  cmd = f'svgo {svg}'
  subprocess.run(cmd, shell=True)


if __name__ == '__main__':
  import argparse
  usage = '%(prog)s [<args>]'
  description = 'A jianpu generator.'
  parser = argparse.ArgumentParser(usage=usage, description=description)
  parser.add_argument('-i', dest='input', help='input file')
  parser.add_argument('-o', dest='output', help='output file')
  args = parser.parse_args()
  with open(args.input, 'r') as src:
    pull_svg(src.read(), args.output)
  optimize_svg(args.output)
