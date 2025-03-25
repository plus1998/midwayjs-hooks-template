# 变量
project_name="hooks_demo"
username="ubuntu"
host="xx.xx.xx.xx"

# 创建文件夹
ssh $username@$host "mkdir -p /home/$username/$project_name"

# 非root用户
ssh $username@$host "sudo chown -R $username:$username /home/$username/$project_name && sudo chmod -R 755 /home/$username/$project_name"

# 将package.json文件同步到服务器
scp package.json $username@$host:/home/$username/$project_name/package.json

# npm install
ssh $username@$host "cd /home/$username/$project_name && npm install --omit=dev"

# 输出同步开始
echo "同步开始"
rsync -avz --delete dist/ $username@$host:/home/$username/$project_name/dist/

# 输出同步完成
echo "同步完成"

# pm2 部署
ssh $username@$host "cd /home/$username/$project_name && pm2 start -x npm --name=$project_name -- run start"

# pm2 重启
# ssh $username@$host "pm2 restart $project_name"
