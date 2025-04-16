# 变量
project_name="hooks_demo"
username="ubuntu"
host="xx.xx.xx.xx"

# 创建文件夹
ssh $username@$host "mkdir -p /home/$username/$project_name"

# 非root用户
ssh $username@$host "sudo chown -R $username:$username /home/$username/$project_name && sudo chmod -R 755 /home/$username/$project_name"

# 将package.json、bootstrap.js、ecosystem.config.js 文件同步到服务器
rsync -avz --delete package.json bootstrap.js ecosystem.config.js dist $username@$host:/home/$username/$project_name/

# npm install
ssh $username@$host "cd /home/$username/$project_name && npm install --omit=dev"

# pm2 部署
ssh $username@$host "cd /home/$username/$project_name && pm2 start"

# 开机自启
# ssh $username@$host "pm2 save && pm2 startup"

