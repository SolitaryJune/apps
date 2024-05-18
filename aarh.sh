#!/bin/bash

# 备份现有的ssh配置文件
sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak

# 替换PermitRootLogin配置项
sudo sed -i 's/#PermitRootLogin.*/PermitRootLogin yes/' /etc/ssh/sshd_config

# 替换PasswordAuthentication配置项
sudo sed -i 's/#PasswordAuthentication.*/PasswordAuthentication yes/' /etc/ssh/sshd_config
sudo sed -i 's/PasswordAuthentication no/PasswordAuthentication yes/' /etc/ssh/sshd_config

# 重启ssh服务
sudo service sshd restart

echo "SSH配置已更新，并已重启SSH服务。"
