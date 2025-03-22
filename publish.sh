# 将dist文件夹同步到服务器目录

# 在服务器上执行以下命令：
# sudo chown -R ubuntu:ubuntu /home/ubuntu/hooks_demo
# sudo chmod -R 755 /home/ubuntu/hooks_demo

# 输出同步开始
echo "同步开始"
rsync -avz --delete dist/ root@xx.xx.xx.xx:/home/ubuntu/hooks_demo/dist/

# 输出同步完成
echo "同步完成"
